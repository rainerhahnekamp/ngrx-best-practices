import { Component, OnInit } from '@angular/core';
import { Customer } from '@eternal/customer/domain';
import { CustomerStore } from '@eternal/customer/data';
import { Component } from '@angular/core';
import { CustomerActions, CustomerAppState } from '@eternal/customer/data';
import { Customer } from '@eternal/customer/domain';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';

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
