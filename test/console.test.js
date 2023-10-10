import readline from "readline";
import * as MissionUtils from "../src";

describe('Console.print', () => {
    test('주어진 메시지를 콘솔에 출력해야 한다.', () => {
        // given
        const message = 'test';
        const logSpy = jest.spyOn(console, "log");

        // when
        MissionUtils.Console.print(message)

        // then
        expect(logSpy).toHaveBeenCalledWith(message);
    });
});

describe('Console.readLine', () => {
    const query = "test";
    const callback = jest.fn();

    test('인자가 2개보다 적게 주어진 경우 예외가 발생해야 한다.', () => {
        // given
        // when
        // then
        expect(() => {
            MissionUtils.Console.readLine(query);
        }).toThrow();
    });

    test('인자가 2개보다 많이 주어진 경우 예외가 발생해야 한다.', () => {
        // given
        // when
        // then
        expect(() => {
            MissionUtils.Console.readLine(query, callback, 1);
        }).toThrow();
    });

    test('query가 문자열이 아닌 경우 예외가 발생해야 한다.', () => {
        // given
        const invalidQuery = 1;

        // when
        // then
        expect(() => {
            MissionUtils.Console.readLine(invalidQuery, callback);
        }).toThrow();
    });

    test('callback이 함수가 아닌 경우 예외가 발생해야 한다.', () => {
        // given
        const invalidCallback = "callback";

        // when
        // then
        expect(() => {
            MissionUtils.Console.readLine(query, invalidCallback);
        }).toThrow();
    });

    test('callback에 인자가 1개가 아닌 경우 예외가 발생해야 한다.', () => {
        // given
        const invalidCallback = (a, b) => {};

        // when
        // then
        expect(() => {
            MissionUtils.Console.readLine(query, invalidCallback);
        }).toThrow();
    });
});

describe('Console.readLineAsync', () => {
  const query = "test";

  test('인자가 주어지지 않은 경우 예외가 발생해야 한다.', async () => {
      // given
      // when
      // then
      await expect(MissionUtils.Console.readLineAsync()).rejects.toThrow();
  });

  test('인자가 1개보다 많이 주어진 경우 예외가 발생해야 한다.', async () => {
      // given
      // when
      // then
      await expect(MissionUtils.Console.readLineAsync(query, 1)).rejects.toThrow();
  });

  test('query가 문자열이 아닌 경우 예외가 발생해야 한다.', async () => {
      // given
      const invalidQuery = 1;

      // when
      // then
      await expect(MissionUtils.Console.readLineAsync(invalidQuery)).rejects.toThrow();
  });

  test('사용자가 입력한 값을 반환해야 한다.', async () => {
      // given
      const userInput = "user input";
      const createInterfaceMock = jest.spyOn(readline, "createInterface");
      const readlineMock = {
        question: jest.fn((query, callback) => {
          callback(userInput);
        }),
        close: jest.fn(),
      };
      createInterfaceMock.mockReturnValue(readlineMock);

      // when
      const result = await MissionUtils.Console.readLineAsync(query);

      // then
      expect(result).toBe(userInput);
      expect(readlineMock.question).toHaveBeenCalledWith(query, expect.any(Function));
      expect(readlineMock.close).toHaveBeenCalled();

      createInterfaceMock.mockRestore();
  });
});
