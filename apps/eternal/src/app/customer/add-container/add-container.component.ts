import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CustomerActions } from '../+state/customer.actions';
import { CustomerAppState } from '../+state/customer.reducer';
import { Customer } from '../customer';

@Component({
  template: `
    <app-customer [customer]="customer" (save)="add($event)"></app-customer>
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

  constructor(private store: Store<CustomerAppState>) {}

  add(customer: Customer) {
    this.store.dispatch(CustomerActions.add({ customer }));
  }
}
