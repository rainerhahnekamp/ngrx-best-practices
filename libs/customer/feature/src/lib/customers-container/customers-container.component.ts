import { Component, OnInit } from '@angular/core';
import { CustomerData } from '@eternal/customer/data';
import { Customer } from '@eternal/customer/model';
import { Observable } from 'rxjs';

@Component({
  template: ` <eternal-customers *ngIf="customers$ | async as customers" [customers]="customers"></eternal-customers> `
})
export class CustomersContainerComponent implements OnInit {
  public customers$: Observable<Customer[]>;

  constructor(private customerStore: CustomerData) {}

  ngOnInit() {
    this.customers$ = this.customerStore.customers$;
  }
}
