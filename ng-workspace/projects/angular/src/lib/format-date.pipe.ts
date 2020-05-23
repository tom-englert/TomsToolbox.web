import {Pipe, PipeTransform} from '@angular/core';
import {CultureService} from "./culture-service";

const defaultFormatOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric'
}

/**
 * Angular pipe to format dates using the culture from the provided [[CultureService]]
 */
@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

  constructor(private readonly cultureService: CultureService) {
    if (!cultureService) {
      throw 'You must provide the CultureService';
    }
  }

  transform(value: Date | string | number, options?: Intl.DateTimeFormatOptions): string {
    return this.cultureService.formatDate(value, options || defaultFormatOptions);
  }
}
