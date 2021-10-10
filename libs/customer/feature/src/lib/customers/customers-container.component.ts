import { Component } from '@angular/core';
import { fromCustomer } from '@eternal/customer/data';
import { Store } from '@ngrx/store';

@Component({
  template: ` <eternal-customers
    *ngIf="customers$ | async as customers"
    [customers]="customers"
  ></eternal-customers>`,
})
export class CustomersContainerComponent {
  customers$ = this.store.select(fromCustomer.selectAll);

  constructor(private store: Store) {}
}
