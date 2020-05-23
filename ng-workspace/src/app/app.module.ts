import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {DateAdapter, MatNativeDateModule, MatRippleModule} from "@angular/material/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatDatepickerModule} from "@angular/material/datepicker";

import {AngularModule, CultureService, CustomDateAdapter, IntlAdapterService} from "angular";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AngularModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatRippleModule,
    ReactiveFormsModule,
  ],
  providers: [
    IntlAdapterService,
    CultureService,
    {provide: LOCALE_ID, useValue: (new Intl.NumberFormat()).resolvedOptions().locale},
    {provide: DateAdapter, useClass: CustomDateAdapter},
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {
}
