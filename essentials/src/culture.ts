import {IntlAdapter} from "./intl.adapter";

/**
 * A thin wrapper around the IntlAdapter to avoid the need to pass a locale id to every method.
 * Ensure to instantiate this as an app-wide singleton to use the same locale id everywhere
 */
export class Culture {

  currentLocale: string;

  constructor(private readonly intl: IntlAdapter) {
    this.currentLocale = intl.defaultLocaleId;
  }

  formatDate(value: Date | number | string, options: Intl.DateTimeFormatOptions): string {
    return this.intl.formatDate(value, this.currentLocale, options);
  }

  formatNumber(value: number, options: Intl.NumberFormatOptions): string {
    return this.intl.formatNumber(value, this.currentLocale, options);
  }

  compare(x: string, y: string, options: Intl.CollatorOptions): number {
    return this.intl.compare(x, y, this.currentLocale, options);
  }

  formatDateRange(start: Date | number | string, end: Date | number | string, options?: Intl.DateTimeFormatOptions): string {
    return this.intl.formatDateRange(start, end, this.currentLocale, options);
  }

  formatTimeRange(start: Date | number | string, end: Date | number | string, options?: Intl.DateTimeFormatOptions): string {
    return this.intl.formatTimeRange(start, end, this.currentLocale, options);
  }

  parseDate(date: string, defaultValue?: Date) : Date {
    return this.intl.parseDate(date, this.currentLocale, defaultValue)
  }
}
