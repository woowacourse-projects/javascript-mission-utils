import * as MissionUtils from "../src";

describe("DateTimes.now", () => {
    test("Date 객체를 반환해야 한다", () => {
        const currentDateTime = MissionUtils.DateTimes.now();
        expect(currentDateTime).toBeInstanceOf(Date);
    });

    test("현재에 가까운 시간을 반환해야 한다", () => {
        const currentDateTime = MissionUtils.DateTimes.now();
        const now = new Date();
        expect(Math.abs(currentDateTime.getTime() - now.getTime())).toBeLessThan(1000);
    });
});
