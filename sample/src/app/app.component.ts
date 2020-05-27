import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

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

  constructor() {
    this.today = new Date().toDateString();
  }
}
