import {Component} from '@angular/core';
import {IntlAdapterService} from "./intl-adapter.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sample';
  today: string;

  constructor(private intl: IntlAdapterService) {
    this.today = intl.formatDate(Date.now(), "de", {year: 'numeric', month: 'long', day: '2-digit', weekday: 'short'})
  }
}
