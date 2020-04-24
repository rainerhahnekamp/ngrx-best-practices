import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Customer } from '@eternal/domain/customer';
import { CustomerAppState, fromCustomer } from '@eternal/data/customer';

@Component({
  template: `
    <eternal-customers
      *ngIf="customers$ | async as customers"
      [customers]="customers"
    ></eternal-customers>
  `
})
export class CustomersContainerComponent implements OnInit {
  public customers$: Observable<Customer[]>;
  constructor(private store: Store<CustomerAppState>) {}

  ngOnInit() {
    this.customers$ = this.store.select(fromCustomer.selectAll);
  }
}
