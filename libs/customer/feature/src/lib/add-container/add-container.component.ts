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
  public customer = {
    id: 0,
    firstname: '',
    name: '',
    country: null,
    birthdate: null
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<CustomerAppState>
  ) {}

  add(customer: Customer) {
    this.store.dispatch(
      CustomerActions.add({
        customer,
        redirectSupplier: id =>
          this.router.createUrlTree(['..', id], { relativeTo: this.route })
      })
    );
  }
}
