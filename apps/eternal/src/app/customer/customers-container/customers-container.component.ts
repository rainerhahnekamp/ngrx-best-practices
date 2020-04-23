import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../customer';
import { CustomerAppState } from '../+state/customer.reducer';
import { Store } from '@ngrx/store';
import { fromCustomer } from '../+state/customer.selectors';

@Component({
  template: `
    <app-customers
      *ngIf="customers$ | async as customers"
      [customers]="customers"
    ></app-customers>
  `
})
export class CustomersContainerComponent implements OnInit {
  public customers$: Observable<Customer[]>;
  constructor(private store: Store<CustomerAppState>) {}

  ngOnInit() {
    this.customers$ = this.store.select(fromCustomer.selectAll);
  }
}
