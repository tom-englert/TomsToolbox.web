import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {CultureService} from "@toms-toolbox/angular";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sample';
  today: string;
  locale = 'unknown'

  formGroup = new FormGroup( { number: new FormControl(42), date: new FormControl(new Date())})

  constructor(culture: CultureService) {
    this.today = new Date().toDateString();
    this.locale = culture.currentLocale;
  }
}
