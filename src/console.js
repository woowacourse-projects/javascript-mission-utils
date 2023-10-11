import readline from "readline";

class Console {
  constructor() {}

  static readLine(query, callback) {
    if (arguments.length !== 2) {
      throw new Error("arguments must be 2.");
    }

    if (typeof query !== "string") {
      throw new Error("query must be string");
    }

    if (typeof callback !== "function") {
      throw new Error("callback must be function");
    }

    if (callback.length !== 1) {
      throw new Error("callback must have 1 argument");
    }

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(query, callback);
  }

  static readLineAsync(query) {
    return new Promise((resolve, reject) => {
      if (arguments.length !== 1) {
        reject(new Error("arguments must be 1"));
      }

      if (typeof query !== "string") {
        reject(new Error("query must be string"));
      }

      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      rl.question(query, (input) => {
        rl.close();
        resolve(input);
      });
    });
  }

  static print(message) {
    console.log(message);
  }
}

export default Console;
