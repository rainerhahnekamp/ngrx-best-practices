import { Component, OnInit } from '@angular/core';
import { CustomerAppState } from '../+state/customer.reducer';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Customer } from '../customer';
import { fromCustomer } from '../+state/customer.selectors';
import { CustomerActions } from '../+state/customer.actions';
import { map } from 'rxjs/operators';

@Component({
  template: `
    <app-customer
      *ngIf="customer$ | async as customer"
      [customer]="customer"
      (save)="edit($event)"
      (remove)="remove($event)"
    ></app-customer>
  `
})
export class EditContainerComponent implements OnInit {
  customer$: Observable<Customer>;
  constructor(
    private route: ActivatedRoute,
    private store: Store<CustomerAppState>
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params.id);
    this.customer$ = this.store
      .select(fromCustomer.selectById, id)
      .pipe(map(customer => ({ ...customer })));
  }

  edit(customer: Customer) {
    this.store.dispatch(CustomerActions.update({ customer }));
  }
  remove(customer: Customer) {
    if (confirm(`Really delete ${customer}?`)) {
      this.store.dispatch(CustomerActions.remove({ customer }));
    }
  }
}
