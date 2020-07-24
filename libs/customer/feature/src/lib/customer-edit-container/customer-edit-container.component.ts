import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';
import { CustomerStore } from '@eternal/customer/data';
import { Customer } from '@eternal/customer/domain';
import { Observable } from 'rxjs';

@Component({
  selector: '<eternal-customer-edit-container>',
  template: `
    <eternal-customer-edit
      *ngIf="customer$ | async as customer"
      [customer]="customer"
      (save)="edit($event)"
      (remove)="remove($event)"
    ></eternal-customer-edit>
  `,
})
export class CustomerEditContainerComponent implements OnInit {
  customer$: Observable<Customer>;
  private redirect: UrlTree;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerStore: CustomerStore
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params.id);
    this.customer$ = this.customerStore.getById(id);
    this.redirect = this.router.createUrlTree(['..'], {
      relativeTo: this.route,
    });
  }

  edit(customer: Customer) {
    this.customerStore.update(customer, this.redirect);
  }

  remove(customer: Customer) {
    if (confirm(`Really delete ${customer}?`)) {
      this.customerStore.remove(customer, this.redirect);
    }
  }
}
