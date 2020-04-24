import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CustomerEffects,
  customerFeatureKey,
  DataCustomerModule,
  reducer
} from '@eternal/data/customer';
import { UiCustomerModule } from '@eternal/ui/customer';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AddContainerComponent } from './add-container/add-container.component';
import { CustomersContainerComponent } from './customers-container/customers-container.component';
import { DataGuard } from './data.guard';
import { EditContainerComponent } from './edit-container/edit-container.component';
import { MockedHttpClient } from './mocked-http-client.service';

@NgModule({
  declarations: [
    AddContainerComponent,
    EditContainerComponent,
    CustomersContainerComponent
  ],
  imports: [
    CommonModule,
    DataCustomerModule,
    UiCustomerModule,
    HttpClientModule,
    RouterModule.forChild([
      {
        path: 'customer',
        canActivate: [DataGuard],
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
    ]),
    StoreModule.forFeature(customerFeatureKey, reducer),
    EffectsModule.forFeature([CustomerEffects])
  ],
  providers: [
    {
      provide: HttpClient,
      useClass: MockedHttpClient
    }
  ]
})
export class CustomerModule {}
