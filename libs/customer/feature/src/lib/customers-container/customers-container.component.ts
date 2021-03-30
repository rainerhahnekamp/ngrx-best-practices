import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '@eternal/customer/model';
import { CustomerData } from '@eternal/customer/data';
import { Filter } from '@eternal/customer/ui';

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
  constructor(private customerData: CustomerData) {}

  ngOnInit() {
    this.customers$ = this.customerData.customers$;
    this.customerData.get(this.filter);
  }

  filterChange(filter: Filter) {
    this.filter = filter;
    this.customerData.get(this.filter);
  }
}
