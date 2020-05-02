import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataCustomerModule } from '@eternal/customer/data';
import { UiCustomerModule } from '@eternal/customer/ui';
import { AddContainerComponent } from './add-container/add-container.component';
import { CustomersContainerComponent } from './customers-container/customers-container.component';
import { EditContainerComponent } from './edit-container/edit-container.component';
import { MockedHttpClient } from './mocked-http-client.service';
import { DataUserModule } from '@eternal/user/data';
import { DataBookingModule } from '@eternal/booking/data';

@NgModule({
  declarations: [
    AddContainerComponent,
    EditContainerComponent,
    CustomersContainerComponent
  ],
  imports: [
    CommonModule,
    DataCustomerModule,
    DataUserModule,
    DataBookingModule,
    UiCustomerModule,
    HttpClientModule,
    RouterModule.forChild([
      {
        path: 'customer',
        children: [
          {
            path: '',
            component: CustomersContainerComponent
          },
          { path: 'new', component: AddContainerComponent },
          {
            path: ':id',
            component: EditContainerComponent
          }
        ]
      }
    ])
  ],
  providers: [
    {
      provide: HttpClient,
      useClass: MockedHttpClient
    }
  ]
})
export class CustomerModule {}
