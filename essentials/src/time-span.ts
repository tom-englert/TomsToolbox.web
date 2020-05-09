const ticksPerMillisecond: number = 10000;
const ticksPerSecond: number = 10000000;
const ticksPerMinute: number = 600000000;
const ticksPerHour: number = 36000000000;
const ticksPerDay: number = 864000000000;

function toNumberOrDefault(input: number | string | undefined): number {
    const n = Number(input);
    if (isNaN(n) || !isFinite(n)) {
        return 0;
    }
    return n;
}

function to2Digits(n: number) {
    return ('00' + n).slice(-2);
}

function to7Digits(n: number) {
    return ('0000000' + n).slice(-7);
}

/**
 * Represents a time interval, similar to the [.Net TimeSpan](https://docs.microsoft.com/en-us/dotnet/api/system.timespan)
 */
export class TimeSpan {

    readonly ticks: number;

    constructor(ticks: number, milliseconds?: number, seconds?: number | string, minutes?: number | string, hours?: number | string, days?: number | string) {
        ticks += toNumberOrDefault(days) * ticksPerDay;
        ticks += toNumberOrDefault(hours) * ticksPerHour;
        ticks += toNumberOrDefault(minutes) * ticksPerMinute;
        ticks += toNumberOrDefault(seconds) * ticksPerSecond;
        ticks += toNumberOrDefault(milliseconds) * ticksPerMillisecond;
        this.ticks = Math.round(ticks);
    }

    add(other: TimeSpan): TimeSpan {
        return new TimeSpan(this.ticks + other.ticks);
    }

    subtract(other: TimeSpan): TimeSpan {
        return new TimeSpan(this.ticks - other.ticks);
    }

    multipliedWith(factor: number): TimeSpan {
        return new TimeSpan(this.ticks * factor);
    }

    dividedBy(divisor: number): TimeSpan {
        return new TimeSpan(this.ticks / divisor);
    }

    negate(): TimeSpan {
        return new TimeSpan(-this.ticks);
    }

    abs(): TimeSpan {
        return new TimeSpan(Math.abs(this.ticks));
    }

    equals(other: TimeSpan): boolean {
        return this.ticks === other.ticks;
    };

    valueOf(): number {
        return this.ticks;
    }

    get totalMilliseconds(): number {
        return this.ticks / ticksPerMillisecond;
    }

    get totalSeconds(): number {
        return this.ticks / ticksPerSecond;
    }

    get totalMinutes(): number {
        return this.ticks / ticksPerMinute;
    }

    get totalHours(): number {
        return this.ticks / ticksPerHour;
    }

    get totalDays(): number {
        return this.ticks / ticksPerDay;
    }

    get milliseconds(): number {
        return Math.floor(this.ticks / ticksPerMillisecond) % 1000;
    }

    get seconds(): number {
        return TimeSpan.getSeconds(this.ticks);
    }

    private static getSeconds(ticks: number): number {
        return Math.floor(ticks / ticksPerSecond) % 60;
    }

    get minutes(): number {
        return TimeSpan.getMinutes(this.ticks);
    }

    private static getMinutes(ticks: number) {
        return Math.floor(ticks / ticksPerMinute) % 60;
    }

    get hours(): number {
        return TimeSpan.getHours(this.ticks);
    }

    private static getHours(ticks: number) {
        return Math.floor(ticks / ticksPerHour) % 24;
    }

    get days(): number {
        return TimeSpan.getDays(this.ticks);
    }

    private static getDays(ticks: number) {
        return Math.floor(ticks / ticksPerDay);
    }

    toString() {
        let text = '';
        let ticks = this.ticks;

        if (this.ticks < 0) {
            text += '-';
            ticks = Math.abs(ticks);
        }

        const days = TimeSpan.getDays(ticks);
        if (days > 0) {
            text += days + '.';
        }

        text += to2Digits(TimeSpan.getHours(ticks)) + ':' + to2Digits(TimeSpan.getMinutes(ticks));

        const seconds = (ticks / ticksPerSecond) % 60;
        if (seconds > 0) {
            text += ':' + to2Digits(Math.floor(seconds));
            const fraction = ticks % ticksPerSecond;
            if (fraction > 0) {
                text += '.' + to7Digits(Math.floor(fraction));
            }
        }

        return text;
    }

    static FromSeconds(seconds: string | number): TimeSpan {
        return new TimeSpan(0, 0, seconds, 0, 0, 0);
    }

    static FromMinutes(minutes: string | number): TimeSpan {
        return new TimeSpan(0, 0, 0, minutes, 0, 0);
    }

    static FromHours(hours: string | number): TimeSpan {
        return new TimeSpan(0, 0, 0, 0, hours, 0);
    }

    static FromDays(days: string | number): TimeSpan {
        return new TimeSpan(0, 0, 0, 0, 0, days);
    }

    static FromDates(firstDate: Date | number | string, secondDate: Date | number | string): TimeSpan {
        let differenceMsecs = new Date(secondDate).valueOf() - new Date(firstDate).valueOf();
        return new TimeSpan(0, differenceMsecs, 0, 0, 0, 0);
    }

    static ParseExact(value: string | TimeSpan | number | undefined): TimeSpan | undefined {
        if (!value) {
            return undefined;
        }

        if (value instanceof TimeSpan) {
            return value;
        }

        const milliseconds = Number(value);
        if (!isNaN(milliseconds)) {
            return new TimeSpan(milliseconds * ticksPerMillisecond);
        }

        if (typeof (value) !== 'string') {
            return undefined;
        }

        const text = value as string;
        let tokens = text.split(':');
        let days = tokens[0].split('.');
        if (days.length == 2) {
            return new TimeSpan(0, 0, tokens[2], tokens[1], days[1], days[0]);
        }

        return new TimeSpan(0, 0, tokens[2], tokens[1], tokens[0], 0);
    }

    static Parse(value: string | TimeSpan | number | undefined): TimeSpan {
        return this.ParseExact(value) || new TimeSpan(0);
    }
}
