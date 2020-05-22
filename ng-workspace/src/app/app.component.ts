import {Component} from '@angular/core';
import {IntlAdapter} from "@toms-toolbox/essentials";
import {DateAdapter} from "@angular/material/core";
import {CultureService, IntlAdapterService} from "angular";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-workspace';
  locale: string;
  today: string;

  constructor(culture: CultureService) {
    this.locale = culture.currentLocale;
    this.today = culture.formatDate(Date.now(), {year: 'numeric', month: 'numeric', day: 'numeric'});
  }
}
