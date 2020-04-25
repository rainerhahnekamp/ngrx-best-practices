import { Component, OnInit } from '@angular/core';
import { CustomerStore } from '@eternal/data/customer';
import { Customer } from '@eternal/domain/customer';
import { Observable } from 'rxjs';

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
