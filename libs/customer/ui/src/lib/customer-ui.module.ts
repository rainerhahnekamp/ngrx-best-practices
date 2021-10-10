import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { CustomersComponent } from './customers/customers.component';

@NgModule({
  imports: [CommonModule, RouterModule, MatIconModule],
  declarations: [CustomersComponent, CustomerComponent],
  exports: [CustomersComponent],
})
export class CustomerUiModule {}
