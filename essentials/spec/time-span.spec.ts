import {TimeSpan} from '../src/time-span';

class SomeClass {
    constructor(readonly someValue: any) {
    }
}

describe('TimeSpan', () => {
    it('Parses input', () => {
        expect((TimeSpan.Parse('1:0')).totalHours).toBe(1);
        expect((TimeSpan.Parse('1:30')).totalHours).toBe(1.5);
        expect((TimeSpan.Parse('1.1:30')).totalHours).toBe(24 + 1.5);
        expect((TimeSpan.Parse('1.1:30')).totalDays).toBe((24 + 1.5) / 24);
        expect((TimeSpan.Parse('01.01:30')).totalHours).toBe(24 + 1.5);
        expect((TimeSpan.Parse('2.12:15:10.200')).totalSeconds).toBe((((((2 * 24) + 12) * 60) + 15) * 60) + 10.2);
        expect((TimeSpan.Parse('2.12:15:10.030')).totalSeconds).toBe((((((2 * 24) + 12) * 60) + 15) * 60) + 10.03);
        expect((TimeSpan.Parse('1:30:05.5')).totalSeconds).toBe((((1 * 60) + 30) * 60) + 5.5);
        expect((TimeSpan.Parse('1:3:05.5')).totalSeconds).toBe((((1 * 60) + 3) * 60) + 5.5);
        expect((TimeSpan.Parse('300:05')).totalMinutes).toBe((300 * 60) + 5);
        expect((TimeSpan.Parse(300)).totalMilliseconds).toBe(300);
        expect((TimeSpan.Parse(TimeSpan.FromHours(0.5))).totalMinutes).toBe(30);
        const date: any = new Date();
        expect((TimeSpan.Parse(<TimeSpan>date)).totalMilliseconds).toBe(date.valueOf());
        const invalid: any = new SomeClass(42);
        expect((TimeSpan.Parse(<TimeSpan>invalid)).totalMilliseconds).toBe(0);
        expect(TimeSpan.ParseExact(<TimeSpan>invalid)).toBeUndefined();
        expect(TimeSpan.ParseExact(undefined)).toBeUndefined();
        expect(TimeSpan.Parse(undefined).valueOf()).toBe(0);
    });

    it('Formats output', () => {
        expect((TimeSpan.Parse('1:0')).toString()).toBe('01:00');
        expect((TimeSpan.Parse('1:30')).toString()).toBe('01:30');
        expect((TimeSpan.Parse('1.1:30')).toString()).toBe('1.01:30');
        expect((TimeSpan.Parse('01.01:30')).toString()).toBe('1.01:30');
        expect((TimeSpan.Parse('2.12:15:10.200')).toString()).toBe('2.12:15:10.2000000');
        expect((TimeSpan.Parse('2.12:15:10.030')).toString()).toBe('2.12:15:10.0300000');
        expect((TimeSpan.Parse('1:30:05.5')).toString()).toBe('01:30:05.5000000');
        expect((TimeSpan.Parse('1:3:05.5')).toString()).toBe('01:03:05.5000000');
        expect((TimeSpan.Parse('300:05')).toString()).toBe('12.12:05');
    });

    it('Constructs values', () => {
        expect((TimeSpan.FromDates("2020-05-09T09:00", "2020-05-10T07:00")).toString()).toBe('22:00');
        expect((TimeSpan.FromDates("2020-05-09T09:00", "2020-05-10T07:20:10")).toString()).toBe('22:20:10');
        expect((TimeSpan.FromDates("2020-05-10T07:20:10", "2020-05-09T09:00")).toString()).toBe('-22:20:10');
        expect((TimeSpan.FromDates("2020-05-10T07:20:10", "2020-05-09T09:00").abs()).toString()).toBe('22:20:10');
        expect((TimeSpan.FromDays(0.5)).toString()).toBe('12:00');
        expect((TimeSpan.FromDays(1)).toString()).toBe('1.00:00');
        expect((TimeSpan.FromDays(1.5)).toString()).toBe('1.12:00');
        expect((TimeSpan.FromHours(1.5)).toString()).toBe('01:30');
        expect((TimeSpan.FromMinutes(20)).toString()).toBe('00:20');
        expect((TimeSpan.FromMinutes(20.31459)).totalMilliseconds).toBe(1218875.4);
        expect((TimeSpan.FromMinutes(20.31459)).toString()).toBe('00:20:18.8754000');
        expect((TimeSpan.FromMinutes(0.01459)).toString()).toBe('00:00:00.8754000');
        expect((TimeSpan.FromSeconds(20.06)).toString()).toBe('00:00:20.0600000');
    })

    it('Calculates', () => {
        expect((TimeSpan.FromMinutes(1).add(TimeSpan.FromHours(2))).toString()).toBe('02:01');
        expect((TimeSpan.FromMinutes(1).subtract(TimeSpan.FromHours(2))).toString()).toBe('-01:59');
        expect((TimeSpan.FromMinutes(1).negate()).toString()).toBe('-00:01');
        expect(TimeSpan.FromMinutes(1).multipliedWith(3).equals(TimeSpan.FromMinutes(3))).toBe(true);
        expect(TimeSpan.FromMinutes(1).dividedBy(3).equals(TimeSpan.FromSeconds(20))).toBe(true);
    })

    it ('Deconstructs', () => {
        const target = TimeSpan.Parse('1.23:45:43.21');
        expect(target.days).toBe(1);
        expect(target.hours).toBe(23);
        expect(target.minutes).toBe(45);
        expect(target.seconds).toBe(43);
        expect(target.milliseconds).toBe(210);
        expect(target.valueOf()).toBe(1719432100000);
    })
});
