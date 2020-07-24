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
import { CustomerBookingComponent } from './customer-booking/customer-booking.component';
import { CustomerReviewComponent } from './customer-review/customer-review.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';

@NgModule({
  declarations: [
    CustomerBookingComponent,
    CustomerComponent,
    CustomerEditComponent,
    CustomerFilterComponent,
    CustomerReviewComponent,
    CustomersComponent,
    WelcomeComponent,
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
    MatExpansionModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTabsModule,
    FormlyModule.forChild(),
    FormlyMaterialModule,
    FormlyMatDatepickerModule,
  ],
  exports: [
    CustomersComponent,
    CustomerComponent,
    CustomerEditComponent,
    CustomerFilterComponent,
    CustomerBookingComponent,
    CustomerReviewComponent,
    WelcomeComponent,
  ],
})
export class UiCustomerModule {}
