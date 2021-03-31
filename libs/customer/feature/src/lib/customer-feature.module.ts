import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomerDataModule } from '@eternal/customer/data';
import { CustomerUiModule } from '@eternal/customer/ui';
import { AddContainerComponent } from './add-container/add-container.component';
import { CustomerBookingContainerComponent } from './customer-booking-container/customer-booking-container.component';
import { CustomerContainerComponent } from './customer-container/customer-container.component';
import { CustomerEditContainerComponent } from './customer-edit-container/customer-edit-container.component';
import { CustomerReviewContainerComponent } from './customer-review-container/customer-review-container.component';
import { CustomersContainerComponent } from './customers-container/customers-container.component';
import { MockedHttpClient } from './mocked-http-client.service';
import { WelcomeContainerComponent } from './welcome-container/welcome-container.component';

@NgModule({
  declarations: [
    AddContainerComponent,
    CustomerBookingContainerComponent,
    CustomerContainerComponent,
    CustomerEditContainerComponent,
    CustomerReviewContainerComponent,
    CustomersContainerComponent,
    WelcomeContainerComponent
  ],
  imports: [
    CommonModule,
    CustomerDataModule,
    CustomerUiModule,
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
          { path: 'welcome/:id', component: WelcomeContainerComponent },
          {
            path: ':id',
            component: CustomerContainerComponent
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
export class CustomerFeatureModule {}
