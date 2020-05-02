import { Component, OnInit } from '@angular/core';
import { Customer } from '@eternal/customer/domain';
import { CustomerStore } from '@eternal/customer/data';

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
