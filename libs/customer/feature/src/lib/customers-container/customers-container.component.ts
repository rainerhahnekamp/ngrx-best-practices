import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '@eternal/customer/domain';
import { CustomerStore } from '@eternal/customer/data';

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
  constructor(private customerStore: CustomerStore) {}

  ngOnInit() {
    this.customers$ = this.customerStore.customers$;
  }
}
