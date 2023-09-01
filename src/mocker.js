import Console from "./console";
import Random from "./random";

class Mocker {
  static mockReadLineAsync(inputs) {
    Console.readLineAsync = jest.fn();
    Console.readLineAsync.mockImplementationOnce(() => new Promise((resolve) => resolve(inputs)));
  }

  static mockRandoms(numbers) {
    Random.pickNumberInRange = jest.fn();
    numbers.reduce((acc, number) => {
      return acc.mockReturnValueOnce(number);
    }, Random.pickNumberInRange);
  }

  static getLogSpy() {
    const logSpy = jest.spyOn(Console, "print");
    logSpy.mockClear();
    return logSpy;
  }

  static run = async ({ inputs, outputs, randoms, callback }) => {
    Mocker.mockRandoms([...randoms]);
    Mocker.mockReadLineAsync(inputs);
    const logSpy = getLogSpy();
    await callback();
    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  };

  static runException = ({ inputs, callback }) => {
    Mocker.mockReadLineAsync(inputs);
    expect(async () => {
      await callback();
    }).rejects.toThrow();
  };
}

export default Mocker;
