export const ticksPerMillisecond: number = 1;
export const ticksPerSecond: number = 1000;
export const ticksPerMinute: number = 60000;
export const ticksPerHour: number = 3600000;
export const ticksPerDay: number = 86400000;

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

function to3Digits(n: number) {
    return ('000' + n).slice(-3);
}

/**
 * Represents a time interval, similar to the [.Net TimeSpan](https://docs.microsoft.com/en-us/dotnet/api/system.timespan)
 */
export class TimeSpan {

    readonly ticks: number;

    /**
     * Constructs a new TimeSpan object whose value is the sum of the specified components.
     */
    constructor(milliseconds: number, seconds?: number | string, minutes?: number | string, hours?: number | string, days?: number | string) {
        milliseconds += toNumberOrDefault(days) * ticksPerDay;
        milliseconds += toNumberOrDefault(hours) * ticksPerHour;
        milliseconds += toNumberOrDefault(minutes) * ticksPerMinute;
        milliseconds += toNumberOrDefault(seconds) * ticksPerSecond;
        this.ticks = Math.round(milliseconds);
    }

    /**
     * Returns a new TimeSpan object whose value is the sum of the specified TimeSpan object and this instance.
     */
    add(other: TimeSpan): TimeSpan {
        return new TimeSpan(this.ticks + other.ticks);
    }

    /**
     * Returns a new TimeSpan object whose value is the difference of the specified TimeSpan object and this instance.
     */
    subtract(other: TimeSpan): TimeSpan {
        return new TimeSpan(this.ticks - other.ticks);
    }

    /**
     * Returns a new TimeSpan object which value is the result of multiplication of this instance and the specified factor.
     */
    multipliedWith(factor: number): TimeSpan {
        return new TimeSpan(this.ticks * factor);
    }

    /**
     * Returns a new TimeSpan object which value is the result of division of this instance and the specified divisor.
     */
    dividedBy(divisor: number): TimeSpan {
        return new TimeSpan(this.ticks / divisor);
    }

    /**
     * Returns a TimeSpan whose value is the negated value of the specified instance.
     */
    negate(): TimeSpan {
        return new TimeSpan(-this.ticks);
    }

    /**
     * Returns a TimeSpan whose value is the absolute value of the specified instance.
     */
    abs(): TimeSpan {
        return new TimeSpan(Math.abs(this.ticks));
    }

    /**
     * Returns a value indicating whether two instances of TimeSpan are equal.
     */
    equals(other: TimeSpan): boolean {
        return this.ticks === other.ticks;
    };

    /**
     * Gets the value of the current TimeSpan expressed in whole and fractional milliseconds.
     */
    valueOf(): number {
        return this.ticks;
    }

    /**
     * Gets the value of the current TimeSpan expressed in whole and fractional milliseconds.
     */
    get totalMilliseconds(): number {
        return this.ticks / ticksPerMillisecond;
    }

    /**
     * Gets the value of the current TimeSpan expressed in whole and fractional seconds.
     */
    get totalSeconds(): number {
        return this.ticks / ticksPerSecond;
    }

    /**
     * Gets the value of the current TimeSpan expressed in whole and fractional minutes.
     */
    get totalMinutes(): number {
        return this.ticks / ticksPerMinute;
    }

    /**
     * Gets the value of the current TimeSpan expressed in whole and fractional hours.
     */
    get totalHours(): number {
        return this.ticks / ticksPerHour;
    }

    /**
     * Gets the value of the current TimeSpan expressed in whole and fractional days.
     */
    get totalDays(): number {
        return this.ticks / ticksPerDay;
    }

    /**
     * Gets the milliseconds component of the time interval
     */
    get milliseconds(): number {
        return Math.floor(this.ticks / ticksPerMillisecond) % 1000;
    }

    /**
     * Gets the seconds component of the time interval
     */
    get seconds(): number {
        return TimeSpan.getSeconds(this.ticks);
    }

    private static getSeconds(ticks: number): number {
        return Math.floor(ticks / ticksPerSecond) % 60;
    }

    /**
     * Gets the minutes component of the time interval
     */
    get minutes(): number {
        return TimeSpan.getMinutes(this.ticks);
    }

    private static getMinutes(ticks: number) {
        return Math.floor(ticks / ticksPerMinute) % 60;
    }

    /**
     * Gets the hours component of the time interval
     */
    get hours(): number {
        return TimeSpan.getHours(this.ticks);
    }

    private static getHours(ticks: number) {
        return Math.floor(ticks / ticksPerHour) % 24;
    }

    /**
     * Gets the days component of the time interval
     */
    get days(): number {
        return TimeSpan.getDays(this.ticks);
    }

    private static getDays(ticks: number) {
        return Math.floor(ticks / ticksPerDay);
    }

    /**
     * Returns the string representation of the TimeSpan object.
     */
    toString() {
        let text = '';
        let ticks = this.ticks;

        if (ticks < 0) {
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
                text += '.' + to3Digits(Math.floor(fraction));
            }
        }

        return text;
    }

    /**
     * Returns a TimeSpan that represents a specified number of seconds, where the specification is accurate to the nearest millisecond.
     */
    static FromSeconds(seconds: string | number): TimeSpan {
        return new TimeSpan(0, seconds, 0, 0, 0);
    }

    /**
     * Returns a TimeSpan that represents a specified number of minutes, where the specification is accurate to the nearest millisecond.
     */
    static FromMinutes(minutes: string | number): TimeSpan {
        return new TimeSpan(0, 0, minutes, 0, 0);
    }

    /**
     * Returns a TimeSpan that represents a specified number of hours, where the specification is accurate to the nearest millisecond.
     */
    static FromHours(hours: string | number): TimeSpan {
        return new TimeSpan(0, 0, 0, hours, 0);
    }

    /**
     * Returns a TimeSpan that represents a specified number of days, where the specification is accurate to the nearest millisecond.
     */
    static FromDays(days: string | number): TimeSpan {
        return new TimeSpan(0, 0, 0, 0, days);
    }

    /**
     * Returns the difference of two dates as a new TimeSpan.
     * @param firstDate
     * @param secondDate
     * @return the TimeSpan
     */
    static FromDates(firstDate: Date | number | string, secondDate: Date | number | string): TimeSpan {
        let differenceMsecs = new Date(secondDate).valueOf() - new Date(firstDate).valueOf();
        return new TimeSpan(differenceMsecs, 0, 0, 0, 0);
    }

    /**
     * Parses the specified value into a TimeSpan.
     * @param value: The value to parse
     * @return the TimeSpan, or undefined if the value can't be parsed.
     */
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
            return new TimeSpan(0, tokens[2], tokens[1], days[1], days[0]);
        }

        return new TimeSpan(0, tokens[2], tokens[1], tokens[0], 0);
    }

    /**
     * Parses the specified value into a TimeSpan.
     * @param value: The value to parse
     * @return the TimeSpan, or a zero TimeSpan if the value can't be parsed.
     */
    static Parse(value: string | TimeSpan | number | undefined): TimeSpan {
        return this.ParseExact(value) || new TimeSpan(0);
    }
}
