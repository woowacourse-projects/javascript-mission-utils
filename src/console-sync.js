import tty from "tty";
import fs from "fs";

let IS_WIN = process.platform === "win32";

const defaultOptions = {
  limit: [],
  encoding: "utf8",
  bufferSize: 1024,
};

let fdR = "none";
let fdW;
let rawInput;

function readlineSync(query, options = defaultOptions) {
  console.log(query);

  let input = "";

  function tryExt() {
    let res = readlineExt(options);
    if (res.error) {
      throw res.error;
    }
    return res.input;
  }

  (function () {
    // open TTY
    let fsB, constants, verNum;

    function getFsB() {
      if (!fsB) {
        fsB = process.binding("fs"); // For raw device path
        constants = process.binding("constants");
        // for v6.3.0+
        constants = constants && constants.fs && typeof constants.fs.O_RDWR === "number" ? constants.fs : constants;
      }
      return fsB;
    }

    if (typeof fdR !== "string") {
      return;
    }
    fdR = null;

    if (IS_WIN) {
      // iojs-v2.3.2+ input stream can't read first line. (#18)
      // ** Don't get process.stdin before check! **
      // Fixed v5.1.0
      // Fixed v4.2.4
      // It regressed again in v5.6.0, it is fixed in v6.2.0.
      verNum = (function (ver) {
        // getVerNum
        var nums = ver.replace(/^\D+/, "").split(".");
        var verNum = 0;
        if ((nums[0] = +nums[0])) {
          verNum += nums[0] * 10000;
        }
        if ((nums[1] = +nums[1])) {
          verNum += nums[1] * 100;
        }
        if ((nums[2] = +nums[2])) {
          verNum += nums[2];
        }
        return verNum;
      })(process.version);
      if (
        !(
          (verNum >= 20302 && verNum < 40204) ||
          (verNum >= 50000 && verNum < 50100) ||
          (verNum >= 50600 && verNum < 60200)
        ) &&
        process.stdin.isTTY
      ) {
        process.stdin.pause();
        fdR = process.stdin.fd;
        ttyR = process.stdin._handle;
      } else {
        try {
          // The stream by fs.openSync('\\\\.\\CON', 'r') can't switch to raw mode.
          // 'CONIN$' might fail on XP, 2000, 7 (x86).
          fdR = getFsB().open("CONIN$", constants.O_RDWR, parseInt("0666", 8));
          ttyR = new tty.ReadStream(fdR, true);
        } catch (e) {
          /* ignore */
        }
      }

      if (process.stdout.isTTY) {
        fdW = process.stdout.fd;
      } else {
        try {
          fdW = fs.openSync("\\\\.\\CON", "w");
        } catch (e) {
          /* ignore */
        }
        if (typeof fdW !== "number") {
          // Retry
          try {
            fdW = getFsB().open("CONOUT$", constants.O_RDWR, parseInt("0666", 8));
          } catch (e) {
            /* ignore */
          }
        }
      }
    } else {
      if (process.stdin.isTTY) {
        process.stdin.pause();
        try {
          fdR = fs.openSync("/dev/tty", "r"); // device file, not process.stdin
          ttyR = process.stdin._handle;
        } catch (e) {
          /* ignore */
        }
      } else {
        // Node.js v0.12 read() fails.
        try {
          fdR = fs.openSync("/dev/tty", "r");
          ttyR = new tty.ReadStream(fdR, false);
        } catch (e) {
          /* ignore */
        }
      }

      if (process.stdout.isTTY) {
        fdW = process.stdout.fd;
      } else {
        try {
          fdW = fs.openSync("/dev/tty", "w");
        } catch (e) {
          /* ignore */
        }
      }
    }
  })();

  (function () {
    // try read
    let atEol;
    let limit;
    let buffer;
    let reqSize;
    let readSize;
    let chunk;
    let line;
    rawInput = "";

    reqSize = options.bufferSize;
    // Check `allocUnsafe` to make sure of the new API.
    buffer = Buffer.allocUnsafe && Buffer.alloc ? Buffer.alloc(reqSize) : new Buffer(reqSize);

    while (true) {
      readSize = 0;
      try {
        readSize = fs.readSync(fdR, buffer, 0, reqSize);
      } catch (e) {
        if (e.code !== "EOF") {
          input += tryExt();
          return;
        }
      }
      if (readSize > 0) {
        chunk = buffer.toString(options.encoding, 0, readSize);
        rawInput += chunk;
      } else {
        chunk = "\n";
        rawInput += String.fromCharCode(0);
      }

      if (chunk && typeof (line = (chunk.match(/^(.*?)[\r\n]/) || [])[1]) === "string") {
        chunk = line;
        atEol = true;
      }

      // other ctrl-chars
      if (chunk) {
        chunk = chunk.replace(/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/g, "");
      }
      if (chunk && limit) {
        chunk = chunk.replace(limit, "");
      }

      if (chunk) {
        input += chunk;
      }

      if (atEol) {
        break;
      }
    }
  })();

  return input.trim();
}

class ConsoleSync {
  constructor() {}

  static readLine(query) {
    if (arguments.length !== 1) {
      throw new Error("arguments must be 1.");
    }

    if (typeof query !== "string") {
      throw new Error("query must be string");
    }

    return readlineSync(query);
  }

  static print(message) {
    console.log(message);
  }
}

export default ConsoleSync;
