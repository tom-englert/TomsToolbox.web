/* istanbul ignore file => test is browser-specific, runs in sample app */

import DateTimeFormatOptions = Intl.DateTimeFormatOptions;
import DateTimeFormatPart = Intl.DateTimeFormatPart;
import {ObjectCache} from "./object/object-cache";

class DateFormatterCache extends ObjectCache<Intl.DateTimeFormat, { locale: string | string[] | undefined, options: Intl.DateTimeFormatOptions }> {
    constructor() {
        super(params => new Intl.DateTimeFormat(params.locale, params.options));
    }

    formatter(locale: string | string[] | undefined, options: Intl.DateTimeFormatOptions): Intl.DateTimeFormat {
        return super.get({locale, options});
    }
}

class NumberFormatterCache extends ObjectCache<Intl.NumberFormat, { locale: string | string[] | undefined, options: Intl.NumberFormatOptions }> {
    constructor() {
        super(params => new Intl.NumberFormat(params.locale, params.options));
    }

    formatter(locale: string | string[] | undefined, options: Intl.NumberFormatOptions): Intl.NumberFormat {
        return super.get({locale, options});
    }
}

class CollatorCache extends ObjectCache<Intl.Collator, { locale: string | string[] | undefined, options: Intl.CollatorOptions }> {
    constructor() {
        super(params => new Intl.Collator(params.locale, params.options));
    }

    collator(locale: string | string[] | undefined, options: Intl.CollatorOptions): Intl.Collator {
        return super.get({locale, options});
    }
}

/**
 * An adapter to the browsers Intl objects
 * (see e.g. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl,
 * This adapter will cache the used Intl objects per locale, so use this class as a singleton service to get the performance benefits.
 */
export class IntlAdapter {
    private dateFormatterCache = new DateFormatterCache();
    private numberFormatterCache = new NumberFormatterCache();
    private collatorCache = new CollatorCache();

    /**
     * Gets the browsers current locale
     */
    readonly defaultLocaleId: string = (new Intl.NumberFormat()).resolvedOptions().locale;

    /**
     * Adapter to the Intl.DateTimeFormat.formatDate() method.
     * See [DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat) for details.
     */
    formatDate(value: Date | number | string, locale: string | string[] | undefined, options: Intl.DateTimeFormatOptions): string {
        return this.dateFormatterCache.formatter(locale, options).format(new Date(value));
    }

    /**
     * Adapter to the Intl.DateTimeFormat.formatDateToParts() method.
     * See [DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat) for details.
     */
    formatDateToParts(value: Date | number | string, locale: string, options: Intl.DateTimeFormatOptions): DateTimeFormatPart[] {
        return this.dateFormatterCache.formatter(locale, options).formatToParts(new Date(value));
    }

    /**
     * Adapter to the Intl.NumberFormat.formatNumber() method.
     * See [NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) for details.
     */
    formatNumber(value: number, locale: string | string[] | undefined, options: Intl.NumberFormatOptions): string {
        return this.numberFormatterCache.formatter(locale, options).format(value);
    }

    /**
     * Adapter to the Intl.Collator.compate() method.
     * See [Collator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator) for details.
     */
    compare(x: string, y: string, locale: string | string[] | undefined, options: Intl.CollatorOptions): number {
        return this.collatorCache.collator(locale, options).compare(x, y);
    }

    /**
     * Formats a date range using the specified culture settings, e.g.
     * 2019-11-15, 2019-11-15, 'en' => 'Fri, Nov 15, 2019'
     * 2019-11-15, 2019-11-20, 'en' => 'Nov 15-20, 2019'
     * 2019-11-15, 2019-12-20, 'en' => 'Nov 15-Dec 20, 2019'
     * @param start: the start date.
     * @param end: the end date.
     * @param locale: the locale used to format.
     * @param options: the option overrides for day, month, year and weekday formats. See [DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat) for details.
     */
    formatDateRange(start: Date | number | string, end: Date | number | string, locale?: string | string[], options?: DateTimeFormatOptions): string {

        start = new Date(start);
        end = new Date(end);

        if (IntlAdapter.isSameDay(start, end)) {
            const defaultOptions = {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                weekday: 'short'
            };
            const effectiveOptions = this.overrideDefaults(defaultOptions, options);
            return this.dateFormatterCache.formatter(locale, effectiveOptions).format(new Date(start));
        }

        const defaultOptions: DateTimeFormatOptions = {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        };

        const effectiveOptions = this.overrideDefaults(defaultOptions, options);
        const formatter = this.dateFormatterCache.formatter(locale, effectiveOptions);
        const startParts: { type: string, value: string }[] = formatter.formatToParts(new Date(start));
        const endParts: { type: string, value: string }[] = formatter.formatToParts(new Date(end));

        return IntlAdapter.compact(start, startParts, end, endParts);
    }

    /**
     * Formats a time range using the specified culture settings, e.g.
     * 2019-11-15 08:20, 2019-11-15 09:40, 'de' => 'Fr., 15. Nov. 2019, 08:20-09:40'
     * 2019-11-15 08:20, 2019-11-16 09:40, 'de' => 'Fr., 15. Nov. 2019, 08:20-Sa., 16. Nov. 2019, 09:40'
     * @param start: the start date and time.
     * @param end: the end date and time.
     * @param locale: the locale used to format.
     * @param options: the option overrides for day, month, year, weekday, hour, minute and second formats. See [DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat) for details.
     */
    formatTimeRange(start: Date | number | string, end: Date | number | string, locale?: string | string[], options?: DateTimeFormatOptions): string {
        const defaultOptions: DateTimeFormatOptions = {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            weekday: 'short',
            hour: 'numeric',
            minute: 'numeric',
            second: undefined
        };
        const effectiveOptions = this.overrideDefaults(defaultOptions, options);
        const formatter = this.dateFormatterCache.formatter(locale, effectiveOptions);

        start = new Date(start);
        end = new Date(end);

        if (IntlAdapter.isSameDay(start, end)) {
            const startParts: { type: string, value: string }[] = formatter.formatToParts(start);
            const endParts: { type: string, value: string }[] = formatter.formatToParts(end);
            const endPartsTimeIndex = endParts.findIndex(item => item.type === 'hour');

            const parts = [...startParts.map(item => item.value), '\u2013', ...endParts.slice(endPartsTimeIndex).map(item => item.value)];
            return parts.reduce((acc, value) => acc += value, '');
        }

        return formatter.format(start) + '\u2013' + formatter.format(end);
    }

    /**
     * Parses a numeric date string using the date rules of the specified culture.
     * @param date: The date string to parse, e.g. 22
     * @param locale: The locale to use for parsing.
     * @param defaultValue: An optional default value used to fill the missing parts.
     */
    parseDate(date: string, locale: string, defaultValue?: Date): Date {
        const pattern = this.formatDateToParts('3333-11-22', locale, {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        });

        const delimiters = pattern
            .filter(item => item.type === 'literal')
            .map(item => IntlAdapter.normalize(item.value));

        const types = pattern
            .filter(item => item.type !== 'literal')
            .map(item => item.type);

        const parts = IntlAdapter.slice(IntlAdapter.normalize(date), delimiters);

        let year = Number(parts[types.indexOf('year')] || -1);
        let month = Number(parts[types.indexOf('month')] || -1);
        let day = Number(parts[types.indexOf('day')] || -1);

        if (isNaN(year) || year < 0) {
            if (defaultValue) {
                year = defaultValue.getFullYear();
            } else {
                return new Date(NaN);
            }
        }

        if (year < 100) {
            year += 2000;
        }

        if (isNaN(month) || month <= 0 || month > 12) {
            if (defaultValue) {
                month = defaultValue.getMonth() + 1;
            } else {
                return new Date(NaN);
            }
        }

        if (isNaN(day) || day <= 0 || day > IntlAdapter.getNumDaysInMonth(year, month - 1)) {
            if (defaultValue) {
                day = defaultValue.getDate();
            } else {
                return new Date(NaN);
            }
        }

        const result = new Date(year, month - 1, day);

        return result;
    }

    private static normalize(str: string) {
        // trim and also strip out unicode LTR and RTL characters.
        return str.replace(/[\u200e\u200f]/g, '').trim();
    }

    private static slice(value: string, delimiters: string[]): string[] {
        const result = [];

        for (const delimiter of delimiters) {
            const index = value.indexOf(delimiter);
            if (index === -1) {
                break;
            }
            const part = value.substr(0, index);
            result.push(part);
            value = value.substr(index + delimiter.length);
        }

        result.push(value);
        return result;
    }

    private static compact(start: Date, startParts: { type: string; value: string }[], end: Date, endParts: { type: string; value: string }[]) {
        let iEnd = 0;
        let iStart = startParts.length - 1;

        if (IntlAdapter.isSameYear(start, end)) {
            for (; iEnd < endParts.length; iEnd++) {
                if ((endParts[iEnd].type === 'day') || endParts[iEnd].value !== startParts[iEnd].value) {
                    break;
                }
            }
            for (; iStart >= 0; iStart--) {
                if ((startParts[iStart].type === 'day') || startParts[iStart].value !== endParts[iStart].value) {
                    break;
                }
            }
        }

        const startValues = startParts.slice(0, iStart + 1).map(item => item.value);
        const endValues = endParts.slice(iEnd).map(item => item.value);

        const combined = [...startValues, '\u2013', ...endValues];

        return combined.reduce((acc, value) => acc += value, '');
    }

    private overrideDefaults<T>(defaults: T, overrides: Partial<T> | undefined): T {
        const result: any = {...defaults};

        if (!overrides) {
            return result;
        }

        Object.keys(result).forEach(key => {
            // @ts-ignore
            const value: any = overrides[key];
            if (value) {
                result[key] = value;
            }

        });
        return result;
    }

    private static isSameDay(day1: Date, day2: Date): boolean {
        return day1.getFullYear() === day2.getFullYear()
            && day1.getMonth() === day2.getMonth()
            && day1.getDate() === day2.getDate();
    }

    private static isSameYear(day1: Date, day2: Date): boolean {
        return day1.getFullYear() === day2.getFullYear();
    }

    private static getNumDaysInMonth(year: number, month: number /* 0..11 */): number {
        return new Date(year, month + 1, 0).getDate();
    }
}
