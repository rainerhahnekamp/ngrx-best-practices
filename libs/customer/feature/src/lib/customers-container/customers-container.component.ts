import { Component, OnInit } from '@angular/core';
import { CustomerAppState, fromCustomer } from '@eternal/customer/data';
import { Customer } from '@eternal/customer/model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  template: ` <eternal-customers *ngIf="customers$ | async as customers" [customers]="customers"></eternal-customers> `
})
export class CustomersContainerComponent implements OnInit {
  public customers$: Observable<Customer[]>;

  constructor(private store: Store<CustomerAppState>) {}

  ngOnInit() {
    this.customers$ = this.store.select(fromCustomer.selectAll);
  }
}
