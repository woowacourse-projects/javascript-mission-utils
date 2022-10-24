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

describe('Console.question', () => {
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
