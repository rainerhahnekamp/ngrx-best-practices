import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerStore } from '@eternal/customer/data';
import { Customer } from '@eternal/customer/domain';

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
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public customerStore: CustomerStore
  ) {
    this.customer = this.customerStore.newCustomer();
  }

  add(customer: Customer) {
    this.customerStore.add(customer, id =>
      this.router.createUrlTree(['..', 'welcome', id], {
        relativeTo: this.route
      })
    );
  }
}
