import DateTimeFormatOptions = Intl.DateTimeFormatOptions;
import {IntlAdapter} from "@toms-toolbox/essentials";

describe('Intl performance #1', () => {
  it('formatting performance #1: no caching', () => {
    const t0 = performance.now();
    for (let i = 0; i < 1000; i++) {
      const formatter = new Intl.DateTimeFormat('en-us', {day: 'numeric', month: 'short', year: 'numeric'});
      const text = formatter.format(new Date('2020-02-25'));
      expect(text).toBe('Feb 25, 2020');
    }
    const t1 = performance.now();
    console.info('Execution #1 took', (t1 - t0), 'ms.');
  });
  it('formatting performance #2: manual caching', () => {
    const t0 = performance.now();
    const formatter = new Intl.DateTimeFormat('en-us', {day: 'numeric', month: 'short', year: 'numeric'});
    for (let i = 0; i < 1000; i++) {
      const text = formatter.format(new Date('2020-02-25'));
      expect(text).toBe('Feb 25, 2020');
    }
    const t1 = performance.now();
    console.info('Execution #2 took', (t1 - t0), 'ms.');
  });
  it('formatting performance #3: caching with service', () => {
    const i18N = new IntlAdapter();
    const t0 = performance.now();
    for (let i = 0; i < 1000; i++) {
      const text = i18N.formatDate(new Date('2020-02-25'), 'en-us', {day: 'numeric', month: 'short', year: 'numeric'});
      expect(text).toBe('Feb 25, 2020');
    }
    const t1 = performance.now();
    console.info('Execution #3 took', (t1 - t0), 'ms.');
  });
});

describe('formatDateRange', () => {
  it('formats date ranges correctly', () => {
    const i18N = new IntlAdapter();
    expect(i18N.formatDateRange(Date.parse('2019-11-15'), Date.parse('2019-11-15'), 'en')).toBe('Fri, Nov 15, 2019');
    expect(i18N.formatDateRange(Date.parse('2019-11-15'), Date.parse('2019-11-20'), 'en')).toBe('Nov 15\u201320, 2019');
    expect(i18N.formatDateRange(Date.parse('2019-11-15'), Date.parse('2019-12-20'), 'en')).toBe('Nov 15\u2013Dec 20, 2019');
    expect(i18N.formatDateRange(Date.parse('2019-11-15'), Date.parse('2020-01-20'), 'en')).toBe('Nov 15, 2019\u2013Jan 20, 2020');
    expect(i18N.formatDateRange(Date.parse('2019-11-15'), Date.parse('2020-11-15'), 'en')).toBe('Nov 15, 2019\u2013Nov 15, 2020');
    expect(i18N.formatDateRange(Date.parse('2019-11-15'), Date.parse('2019-11-20'), 'de')).toBe('15\u201320. Nov. 2019');
    expect(i18N.formatDateRange(Date.parse('2019-11-15'), Date.parse('2019-12-20'), 'de')).toBe('15. Nov.\u201320. Dez. 2019');
    expect(i18N.formatDateRange(Date.parse('2019-11-15'), Date.parse('2020-01-20'), 'de')).toBe('15. Nov. 2019\u201320. Jan. 2020');
    expect(i18N.formatDateRange(Date.parse('2019-11-15'), Date.parse('2020-11-15'), 'de')).toBe('15. Nov. 2019\u201315. Nov. 2020');
    expect(i18N.formatDateRange(Date.parse('2019-11-15'), Date.parse('2019-11-20'), 'fr')).toBe('15\u201320 nov. 2019');
    expect(i18N.formatDateRange(Date.parse('2019-11-15'), Date.parse('2019-12-20'), 'fr')).toBe('15 nov.\u201320 déc. 2019');
    expect(i18N.formatDateRange(Date.parse('2019-11-15'), Date.parse('2020-01-20'), 'fr')).toBe('15 nov. 2019\u201320 janv. 2020');
    expect(i18N.formatDateRange(Date.parse('2019-11-15'), Date.parse('2020-11-15'), 'fr')).toBe('15 nov. 2019\u201315 nov. 2020');
  });
});

describe('formatDateRange with options', () => {
  it('formats date ranges correctly', () => {
    const i18N = new IntlAdapter();
    const options: DateTimeFormatOptions = {month: 'long', weekday: 'long'};

    expect(i18N.formatDateRange(Date.parse('2019-11-15'), Date.parse('2019-11-15'), 'en', options)).toBe('Friday, November 15, 2019');
    expect(i18N.formatDateRange(Date.parse('2019-11-15'), Date.parse('2019-11-20'), 'en', options)).toBe('November 15\u201320, 2019');
    expect(i18N.formatDateRange(Date.parse('2019-11-15'), Date.parse('2019-12-20'), 'en', options)).toBe('November 15\u2013December 20, 2019');
    expect(i18N.formatDateRange(Date.parse('2019-11-15'), Date.parse('2020-01-20'), 'en', options)).toBe('November 15, 2019\u2013January 20, 2020');
    expect(i18N.formatDateRange(Date.parse('2019-11-15'), Date.parse('2020-11-15'), 'en', options)).toBe('November 15, 2019\u2013November 15, 2020');
    expect(i18N.formatDateRange(Date.parse('2019-11-15'), Date.parse('2019-11-20'), 'de', options)).toBe('15\u201320. November 2019');
    expect(i18N.formatDateRange(Date.parse('2019-11-15'), Date.parse('2019-12-20'), 'de', options)).toBe('15. November\u201320. Dezember 2019');
    expect(i18N.formatDateRange(Date.parse('2019-11-15'), Date.parse('2020-01-20'), 'de', options)).toBe('15. November 2019\u201320. Januar 2020');
    expect(i18N.formatDateRange(Date.parse('2019-11-15'), Date.parse('2020-11-15'), 'de', options)).toBe('15. November 2019\u201315. November 2020');
  });
});

describe('formatTimeRange', () => {
  it('formats time ranges on same day correctly', () => {
    const i18N = new IntlAdapter();
    expect(i18N.formatTimeRange(Date.parse('2019-11-15 08:20'), Date.parse('2019-11-15 09:40'), 'en')).toBe('Fri, Nov 15, 2019, 8:20 AM\u20139:40 AM');
    expect(i18N.formatTimeRange(Date.parse('2019-11-15 08:20'), Date.parse('2019-11-15 09:40'), 'de')).toBe('Fr., 15. Nov. 2019, 08:20\u201309:40');
    expect(i18N.formatTimeRange(Date.parse('2019-11-15 08:20'), Date.parse('2019-11-15 09:40'), 'fr')).toBe('ven. 15 nov. 2019, 08:20\u201309:40');
    expect(i18N.formatTimeRange(Date.parse('2019-11-15 08:20'), Date.parse('2019-11-15 09:40'), 'ja')).toBe('2019年11月15日(金) 8:20\u20139:40');
    expect(i18N.formatTimeRange(Date.parse('2019-11-15 08:20'), Date.parse('2019-11-15 19:40'), 'en')).toBe('Fri, Nov 15, 2019, 8:20 AM\u20137:40 PM');
    expect(i18N.formatTimeRange(Date.parse('2019-11-15 08:20'), Date.parse('2019-11-15 19:40'), 'de')).toBe('Fr., 15. Nov. 2019, 08:20\u201319:40');
    expect(i18N.formatTimeRange(Date.parse('2019-11-15 08:20'), Date.parse('2019-11-15 19:40'), 'fr')).toBe('ven. 15 nov. 2019, 08:20\u201319:40');
    expect(i18N.formatTimeRange(Date.parse('2019-11-15 08:20'), Date.parse('2019-11-15 19:40'), 'ja')).toBe('2019年11月15日(金) 8:20\u201319:40');
  });
  it('formats time ranges on different days correctly', () => {
    const i18N = new IntlAdapter();
    expect(i18N.formatTimeRange(Date.parse('2019-11-15 08:20'), Date.parse('2019-11-16 09:40'), 'en')).toBe('Fri, Nov 15, 2019, 8:20 AM\u2013Sat, Nov 16, 2019, 9:40 AM');
    expect(i18N.formatTimeRange(Date.parse('2019-11-15 08:20'), Date.parse('2019-11-16 09:40'), 'de')).toBe('Fr., 15. Nov. 2019, 08:20\u2013Sa., 16. Nov. 2019, 09:40');
    expect(i18N.formatTimeRange(Date.parse('2019-11-15 08:20'), Date.parse('2019-11-16 09:40'), 'fr')).toBe('ven. 15 nov. 2019, 08:20\u2013sam. 16 nov. 2019, 09:40');
    expect(i18N.formatTimeRange(Date.parse('2019-11-15 08:20'), Date.parse('2019-11-16 09:40'), 'ja')).toBe('2019年11月15日(金) 8:20\u20132019年11月16日(土) 9:40');
    expect(i18N.formatTimeRange(Date.parse('2019-11-15 08:20'), Date.parse('2019-11-16 19:40'), 'en')).toBe('Fri, Nov 15, 2019, 8:20 AM\u2013Sat, Nov 16, 2019, 7:40 PM');
    expect(i18N.formatTimeRange(Date.parse('2019-11-15 08:20'), Date.parse('2019-11-16 19:40'), 'de')).toBe('Fr., 15. Nov. 2019, 08:20\u2013Sa., 16. Nov. 2019, 19:40');
    expect(i18N.formatTimeRange(Date.parse('2019-11-15 08:20'), Date.parse('2019-11-16 19:40'), 'fr')).toBe('ven. 15 nov. 2019, 08:20\u2013sam. 16 nov. 2019, 19:40');
    expect(i18N.formatTimeRange(Date.parse('2019-11-15 08:20'), Date.parse('2019-11-16 19:40'), 'ja')).toBe('2019年11月15日(金) 8:20\u20132019年11月16日(土) 19:40');
  });
  it('formats time ranges with options correctly', () => {
    const i18N = new IntlAdapter();
    const options: DateTimeFormatOptions = {second: 'numeric'};

    expect(i18N.formatTimeRange(Date.parse('2019-11-15 08:20'), Date.parse('2019-11-16 09:40'), 'en', options)).toBe('Fri, Nov 15, 2019, 8:20:00 AM\u2013Sat, Nov 16, 2019, 9:40:00 AM');
    expect(i18N.formatTimeRange(Date.parse('2019-11-15 08:20'), Date.parse('2019-11-16 09:40'), 'de', options)).toBe('Fr., 15. Nov. 2019, 08:20:00\u2013Sa., 16. Nov. 2019, 09:40:00');
    expect(i18N.formatTimeRange(Date.parse('2019-11-15 08:20'), Date.parse('2019-11-16 09:40'), 'fr', options)).toBe('ven. 15 nov. 2019, 08:20:00\u2013sam. 16 nov. 2019, 09:40:00');
    expect(i18N.formatTimeRange(Date.parse('2019-11-15 08:20'), Date.parse('2019-11-16 09:40'), 'ja', options)).toBe('2019年11月15日(金) 8:20:00\u20132019年11月16日(土) 9:40:00');
    expect(i18N.formatTimeRange(Date.parse('2019-11-15 08:20'), Date.parse('2019-11-16 19:40'), 'en', options)).toBe('Fri, Nov 15, 2019, 8:20:00 AM\u2013Sat, Nov 16, 2019, 7:40:00 PM');
    expect(i18N.formatTimeRange(Date.parse('2019-11-15 08:20'), Date.parse('2019-11-16 19:40'), 'de', options)).toBe('Fr., 15. Nov. 2019, 08:20:00\u2013Sa., 16. Nov. 2019, 19:40:00');
    expect(i18N.formatTimeRange(Date.parse('2019-11-15 08:20'), Date.parse('2019-11-16 19:40'), 'fr', options)).toBe('ven. 15 nov. 2019, 08:20:00\u2013sam. 16 nov. 2019, 19:40:00');
    expect(i18N.formatTimeRange(Date.parse('2019-11-15 08:20'), Date.parse('2019-11-16 19:40'), 'ja', options)).toBe('2019年11月15日(金) 8:20:00\u20132019年11月16日(土) 19:40:00');
  });
});

describe('parseDate', () => {
  it('parses dates correctly', () => {
    const i18N = new IntlAdapter();
    const today = new Date(2020, 3, 23);

    expect(i18N.parseDate("1.2.2020", 'de').toLocaleDateString('en')).toBe('2/1/2020');
    expect(i18N.parseDate("1.2.", 'de').toLocaleDateString('en')).toBe('Invalid Date');
    expect(i18N.parseDate("1.", 'de').toLocaleDateString('en')).toBe('Invalid Date');

    expect(i18N.parseDate("1.2.", 'de', today).toLocaleDateString('en')).toBe('2/1/2020');
    expect(i18N.parseDate("1.", 'de', today).toLocaleDateString('en')).toBe('4/1/2020');
    expect(i18N.parseDate("", 'de', today).toLocaleDateString('en')).toBe('4/23/2020');

    expect(i18N.parseDate("2020/2/1", 'ja').toLocaleDateString('en')).toBe('2/1/2020');
    expect(i18N.parseDate("01/02/2020", 'fr').toLocaleDateString('en')).toBe('2/1/2020');
    expect(i18N.parseDate("01 / 02 / 2020", 'fr').toLocaleDateString('en')).toBe('2/1/2020');
    expect(i18N.parseDate("1 /2 /20", 'fr').toLocaleDateString('en')).toBe('2/1/2020');
    expect(i18N.parseDate("2020. 2. 1.", 'ko').toLocaleDateString('en')).toBe('2/1/2020');
    expect(i18N.parseDate("2020.2.1", 'ko').toLocaleDateString('en')).toBe('2/1/2020');
    expect(i18N.parseDate("1/2/2020", 'ar').toLocaleDateString('en')).toBe('2/1/2020');
    expect(i18N.parseDate("1\u200E/2\u200F/2020", 'ar').toLocaleDateString('en')).toBe('2/1/2020');
  });
});

