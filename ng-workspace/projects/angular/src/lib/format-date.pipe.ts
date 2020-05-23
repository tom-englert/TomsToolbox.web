import {Pipe, PipeTransform} from '@angular/core';
import {CultureService} from "./culture-service";

const defaultFormatOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric'
}

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

  constructor(private readonly cultureService: CultureService) {
  }

  transform(value: Date | string | number, options?: Intl.DateTimeFormatOptions): string {
    return this.cultureService.formatDate(value, options || defaultFormatOptions);
  }
}
