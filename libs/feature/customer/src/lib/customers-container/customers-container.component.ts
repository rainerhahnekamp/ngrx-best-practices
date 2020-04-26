import { Component, OnInit } from '@angular/core';
import { CustomerStore } from '@eternal/data/customer';
import { Customer } from '@eternal/domain/customer';
import { Observable } from 'rxjs';
import { Filter } from '@eternal/ui/customer';

@Component({
  template: `
    <eternal-customer-filter
      [filter]="filter"
      (filterChange)="filterChange($event)"
    >
      <eternal-customers
        *ngIf="customers$ | async as customers"
        [customers]="customers"
      ></eternal-customers>
    </eternal-customer-filter>
  `
})
export class CustomersContainerComponent implements OnInit {
  public customers$: Observable<Customer[]>;
  public filter: Filter = { page: 1 };
  constructor(private customerStore: CustomerStore) {}

  ngOnInit() {
    this.customers$ = this.customerStore.customers$;
    this.customerStore.get(this.filter);
  }

  filterChange(filter: Filter) {
    this.filter = filter;
    this.customerStore.get(this.filter);
  }
}
