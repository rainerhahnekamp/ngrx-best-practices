import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerStore } from '@eternal/customer/data';
import { Customer } from '@eternal/customer/domain';
import { Observable } from 'rxjs';

@Component({
  template: `
    <eternal-customer
      *ngIf="customer$ | async as customer"
      [customer]="customer"
      (save)="edit($event)"
      (remove)="remove($event)"
    ></eternal-customer>
  `
})
export class EditContainerComponent implements OnInit {
  customer$: Observable<Customer>;
  constructor(
    private route: ActivatedRoute,
    private customerStore: CustomerStore
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params.id);
    this.customer$ = this.customerStore.getById(id);
  }

  edit(customer: Customer) {
    this.customerStore.update(customer);
  }

  remove(customer: Customer) {
    if (confirm(`Really delete ${customer}?`)) {
      this.customerStore.remove(customer);
    }
  }
}
