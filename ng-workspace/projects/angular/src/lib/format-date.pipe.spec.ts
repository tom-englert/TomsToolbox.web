import { FormatDatePipe } from './format-date.pipe';
import {CultureService} from "./culture-service";
import {IntlAdapterService} from "./intl-adapter.service";

describe('FormatDatePipe', () => {
  it('should throw on missing argument', () => {
    expect(() => new FormatDatePipe(undefined)).toThrow('You must provide the CultureService');
  });

  it('should transform dates', () => {
    const adapterService = new IntlAdapterService();
    const cultureService = new CultureService(adapterService);
    const pipe = new FormatDatePipe(cultureService);
    cultureService.currentLocale = 'en';
    expect(pipe.transform(new Date(2020, 5, 20))).toBe('6/20/2020');
    cultureService.currentLocale = 'de';
    expect(pipe.transform(new Date(2020, 5, 20))).toBe('20.6.2020');
  });

});
