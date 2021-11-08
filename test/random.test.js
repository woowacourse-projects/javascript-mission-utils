import * as MissionUtils from "../src";

expect.extend({
  toBeDistinct(received) {
    const pass =
      Array.isArray(received) && new Set(received).size === received.length;
    if (pass) {
      return {
        message: () => `expected [${received}] array is unique`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected [${received}] array is not to unique`,
        pass: false,
      };
    }
  },
});

describe("Random.pickNumberInRange", () => {
  test("시작 또는 끝 숫자를 포함한 범위 내의 숫자를 반환해야 한다.", () => {
    // given
    const start = 1;
    const end = 5;

    // when
    const number = MissionUtils.Random.pickNumberInRange(start, end);

    // then
    expect(number).toBeGreaterThanOrEqual(start);
    expect(number).toBeLessThanOrEqual(end);
  });

  test("시작 숫자가 끝 숫자보다 크면 예외가 발생해야 한다.", () => {
    // given
    const start = 1;
    const end = start - 1;

    // when
    // then
    expect(() => {
      MissionUtils.Random.pickNumberInRange(start, end);
    }).toThrow();
  });

  test("시작 숫자가 Number.MIN_SAFE_INTEGER 작으면 예외가 발생해야 한다.", () => {
    // given
    const start = Number.MIN_SAFE_INTEGER - 1;
    const end = start + 10;

    // when
    // then
    expect(() => {
      MissionUtils.Random.pickNumberInRange(start, end);
    }).toThrow();
  });

  test("끝 숫자가 Number.MAX_SAFE_INTEGER보다 크면 예외가 발생해야 한다.", () => {
    // given
    const start = 1;
    const end = Number.MAX_SAFE_INTEGER + 1;

    // when
    // then
    expect(() => {
      MissionUtils.Random.pickNumberInRange(start, end);
    }).toThrow();
  });
});

describe("Random.pickNumberInList", () => {
  test("주어진 목록에 있는 숫자 중 하나를 반환해야 한다.", () => {
    // given
    const list = [1, 2, 3, 4, 5];

    // when
    const number = MissionUtils.Random.pickNumberInList(list);

    // then
    expect(list).toContain(number);
  });

  test("목록이 비어 있을 경우 예외가 발생해야 한다.", () => {
    // given
    const list = [];

    // when
    // then
    expect(() => {
      MissionUtils.Random.pickNumberInList(list);
    }).toThrow();
  });

  test("숫자로만 이루어진 목록이 아닌 경우 예외가 발생해야 한다.", () => {
    // given
    const list = [2, "text", 4];

    // when
    // then
    expect(() => {
      MissionUtils.Random.pickNumberInList(list);
    }).toThrow();
  });

  test("주어진 목록이 배열이 아닐 경우 예외가 발생해야 한다.", () => {
    // given
    // when
    // then
    expect(() => {
      MissionUtils.Random.pickNumberInList("");
    }).toThrow();

    expect(() => {
      MissionUtils.Random.pickNumberInList({});
    }).toThrow();

    expect(() => {
      MissionUtils.Random.pickNumberInList(1);
    }).toThrow();

    expect(() => {
      MissionUtils.Random.pickNumberInList();
    }).toThrow();
  });
});

describe("Random.pickUniqueNumbersInRange", () => {
  test("범위 내에서 지정된 개수만큼 겹치지 않는 숫자를 반환해야 한다.", () => {
    // given
    const start = 1;
    const end = 5;
    const count = 2;

    // when
    const numbers = MissionUtils.Random.pickUniqueNumbersInRange(
      start,
      end,
      count
    );

    // then
    expect(numbers).toHaveLength(count);
    numbers.forEach(
      (number) =>
        expect(number).toBeGreaterThanOrEqual(start) &&
        expect(number).toBeLessThanOrEqual(end)
    );
    expect(numbers).toBeDistinct();
  });

  test("개수가 음수이면 예외가 발생해야 한다.", () => {
    // given
    const start = 1;
    const end = 5;
    const count = -1;

    // when
    // then
    expect(() => {
      MissionUtils.Random.pickUniqueNumbersInRange(start, end, count);
    }).toThrow();
  });

  test("개수가 숫자 범위의 크기보다 크면 예외가 발생해야 한다.", () => {
    // given
    const start = 1;
    const end = 5;
    const count = 10;

    // when
    // then
    expect(() => {
      MissionUtils.Random.pickUniqueNumbersInRange(start, end, count);
    }).toThrow();
  });

  test("시작 숫자가 끝 숫자보다 크면 예외가 발생해야 한다.", () => {
    // given
    const start = 1;
    const end = start - 1;

    // when
    // then
    expect(() => {
      MissionUtils.Random.pickUniqueNumbersInRange(start, end);
    }).toThrow();
  });

  test("시작 숫자가 Number.MIN_SAFE_INTEGER 작으면 예외가 발생해야 한다.", () => {
    // given
    const start = Number.MIN_SAFE_INTEGER - 1;
    const end = start + 10;

    // when
    // then
    expect(() => {
      MissionUtils.Random.pickUniqueNumbersInRange(start, end);
    }).toThrow();
  });

  test("끝 숫자가 Number.MAX_SAFE_INTEGER보다 크면 예외가 발생해야 한다.", () => {
    // given
    const start = 1;
    const end = Number.MAX_SAFE_INTEGER + 1;

    // when
    // then
    expect(() => {
      MissionUtils.Random.pickUniqueNumbersInRange(start, end);
    }).toThrow();
  });
});
