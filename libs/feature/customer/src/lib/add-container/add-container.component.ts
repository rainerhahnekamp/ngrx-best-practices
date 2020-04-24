import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CustomerAppState, CustomerActions } from '@eternal/data/customer';
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
