import { Component } from '@angular/core';
import { CustomerStore } from '@eternal/data/customer';
import { Customer } from '@eternal/domain/customer';

@Component({
  template: `
    <eternal-customer
      [customer]="customer"
      (save)="add($event)"
    ></eternal-customer>
  `
})
export class AddContainerComponent {
  customer: Customer;
  constructor(public customerStore: CustomerStore) {
    this.customer = this.customerStore.newCustomer();
  }

  add(customer: Customer) {
    this.customerStore.add(customer);
  }
}
