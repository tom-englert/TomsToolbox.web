import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {DateAdapter, MatNativeDateModule, MatRippleModule} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {CultureService, CustomDateAdapter, IntlAdapterService, TomsAngularModule} from "@toms-toolbox/angular";
import {RelativeUrl} from "@toms-toolbox/essentials";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatRippleModule,
    ReactiveFormsModule,
    TomsAngularModule,
  ],
  providers: [
    IntlAdapterService,
    CultureService,
    {provide: LOCALE_ID, useValue: (new Intl.NumberFormat()).resolvedOptions().locale},
    {provide: DateAdapter, useClass: CustomDateAdapter},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
