import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de-AT';
import { LOCALE_ID, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { CustomerModule } from './customer/customer.module';
import { HolidaysModule } from './holidays/holidays.module';
import { HomeComponent } from './home.component';

registerLocaleData(localeDe, 'de-AT');

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CustomerModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    HolidaysModule,
    RouterModule.forRoot([
      {
        path: '',
        pathMatch: 'full',
        component: HomeComponent
      }
    ]),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    ReactiveFormsModule,
    FormlyModule.forRoot({ extras: { lazyRender: true } }),
    FormlyMaterialModule
  ],
  providers: [
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'de-AT'
    },
    { provide: LOCALE_ID, useValue: 'de-AT' },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
