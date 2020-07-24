import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataBookingModule } from '@eternal/booking/data';
import { DataCustomerModule } from '@eternal/customer/data';
import { UiCustomerModule } from '@eternal/customer/ui';
import { ReviewDataModule } from '@eternal/review/data';
import { DataUserModule } from '@eternal/user/data';
import { AddContainerComponent } from './add-container/add-container.component';
import { CustomerBookingContainerComponent } from './customer-booking-container/customer-booking-container.component';
import { CustomerContainerComponent } from './customer-container/customer-container.component';
import { CustomerReviewContainerComponent } from './customer-review-container/customer-review-container.component';
import { CustomersContainerComponent } from './customers-container/customers-container.component';
import { MockedHttpClient } from './mocked-http-client.service';
import { WelcomeContainerComponent } from './welcome-container/welcome-container.component';
import { CustomerEditContainerComponent } from './customer-edit-container/customer-edit-container.component';

@NgModule({
  declarations: [
    AddContainerComponent,
    CustomerBookingContainerComponent,
    CustomerContainerComponent,
    CustomerEditContainerComponent,
    CustomerReviewContainerComponent,
    CustomersContainerComponent,
    WelcomeContainerComponent,
  ],
  imports: [
    CommonModule,
    DataCustomerModule,
    DataUserModule,
    DataBookingModule,
    ReviewDataModule,
    UiCustomerModule,
    HttpClientModule,
    RouterModule.forChild([
      {
        path: 'customer',
        children: [
          {
            path: '',
            component: CustomersContainerComponent,
          },
          { path: 'new', component: AddContainerComponent },
          { path: 'welcome/:id', component: WelcomeContainerComponent },
          {
            path: ':id',
            component: CustomerContainerComponent,
          },
        ],
      },
    ]),
  ],
  providers: [
    {
      provide: HttpClient,
      useClass: MockedHttpClient,
    },
  ],
})
export class CustomerModule {}
