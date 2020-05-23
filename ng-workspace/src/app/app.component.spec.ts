import {TestBed, async} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {AngularModule, CultureService, CustomDateAdapter, IntlAdapterService} from "angular";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {DateAdapter, MatNativeDateModule, MatRippleModule} from "@angular/material/core";
import {CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID} from "@angular/core";
import {MatDatepickerModule} from "@angular/material/datepicker";

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
      ],
      providers: [
        IntlAdapterService,
        CultureService,
        {provide: LOCALE_ID, useValue: (new Intl.NumberFormat()).resolvedOptions().locale},
        {provide: DateAdapter, useClass: CustomDateAdapter},
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ng-workspace'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toContain('ng-workspace');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to ng-workspace');
  });
});
