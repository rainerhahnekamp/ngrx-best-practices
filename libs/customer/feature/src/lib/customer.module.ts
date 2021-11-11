import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CustomerDataModule } from '@eternal/customer/data';
import { CustomerUiModule } from '@eternal/customer/ui';
import { AddCustomerComponent } from './add-customer.component';
import { CustomersContainerComponent } from './customers-container.component';
import { DataGuard } from './data.guard';
import { EditCustomerComponent } from './edit-customer.component';
import { MockedHttpClient } from './mocked-http-client.service';

@NgModule({
  declarations: [
    EditCustomerComponent,
    AddCustomerComponent,
    CustomersContainerComponent,
  ],
  imports: [
    CommonModule,
    CustomerDataModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
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
            component: AddCustomerComponent,
            data: { mode: 'new' },
          },
          {
            path: ':id',
            component: EditCustomerComponent,
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
