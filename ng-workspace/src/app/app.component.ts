import {Component} from '@angular/core';
import {CultureService} from "@toms-toolbox/angular";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-workspace';
  locale: string;
  today = Date.now();

  formGroup = new FormGroup( { number: new FormControl(42), date: new FormControl(new Date())})

  constructor(culture: CultureService) {
    this.locale = culture.currentLocale;
  }
}
