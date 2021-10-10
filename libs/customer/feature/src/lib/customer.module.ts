import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CustomerDataModule } from '@eternal/customer/data';
import { CustomerUiModule } from '@eternal/customer/ui';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker';
import { CustomerContainerComponent } from './customer/customer-container.component';
import { CustomersContainerComponent } from './customers/customers-container.component';
import { DataGuard } from './data.guard';
import { MockedHttpClient } from './mocked-http-client.service';

@NgModule({
  declarations: [CustomersContainerComponent, CustomerContainerComponent],
  imports: [
    CommonModule,
    CustomerDataModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    FormlyModule.forChild(),
    FormlyMaterialModule,
    FormlyMatDatepickerModule,
    MatNativeDateModule,
    RouterModule.forChild([
      {
        path: 'customer',
        canActivate: [DataGuard],
        children: [
          {
            path: '',
            component: CustomersContainerComponent,
          },
          {
            path: 'new',
            component: CustomerContainerComponent,
            data: { mode: 'new' },
          },
          {
            path: ':id',
            component: CustomerContainerComponent,
            data: { mode: 'edit' },
          },
        ],
      },
    ]),
    CustomerUiModule,
  ],
  providers: [
    {
      provide: HttpClient,
      useClass: MockedHttpClient,
    },
  ],
})
export class CustomerModule {}
