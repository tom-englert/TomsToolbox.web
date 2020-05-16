import DateTimeFormatOptions = Intl.DateTimeFormatOptions;
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
     * Adapter to the Intl.DateTimeFormat.
     * See [DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat) for details.
     */
    formatDate(value: Date | number | string, locale: string | string[] | undefined, options: Intl.DateTimeFormatOptions): string {
        return this.dateFormatterCache.formatter(locale, options).format(new Date(value));
    }

    /**
     * Adapter to the Intl.NumberFormat.
     * See [NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat) for details.
     */
    formatNumber(value: number, locale: string | string[] | undefined, options: Intl.NumberFormatOptions): string {
        return this.numberFormatterCache.formatter(locale, options).format(value);
    }

    /**
     * Adapter to the Intl.Collator.
     * See [Collator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/Collator) for details.
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
        const formatter = this.
        dateFormatterCache.formatter(locale, effectiveOptions);
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
        if (!overrides) {
            return defaults;
        }

        const result: any = {...defaults};
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
}
