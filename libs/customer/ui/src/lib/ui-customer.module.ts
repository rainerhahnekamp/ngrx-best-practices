import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker';
import { CustomerFilterComponent } from './customer-filter/customer-filter.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomersComponent } from './customers/customers.component';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [
    CustomersComponent,
    CustomerComponent,
    CustomerFilterComponent,
    WelcomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatSelectModule,
    FormlyModule.forChild(),
    FormlyMaterialModule,
    FormlyMatDatepickerModule
  ],
  exports: [
    CustomersComponent,
    CustomerComponent,
    CustomerFilterComponent,
    WelcomeComponent
  ]
})
export class UiCustomerModule {}
