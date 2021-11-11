import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerActions, fromCustomer } from '@eternal/customer/data';
import { Customer } from '@eternal/customer/model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'eternal-edit-customer',
  template: ` <eternal-customer
    *ngIf="customer$ | async as customer"
    [customer]="customer"
    (save)="this.submit($event)"
    (remove)="this.remove($event)"
  ></eternal-customer>`,
})
export class EditCustomerComponent implements OnInit {
  customer$: Observable<Customer> | undefined;
  customerId = 0;

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit() {
    this.customer$ = this.store
      .select(
        fromCustomer.selectById(Number(this.route.snapshot.params.id || ''))
      )
      .pipe(
        this.verifyCustomer,
        map((customer) => {
          this.customerId = customer.id;
          return { ...customer };
        })
      );
  }

  submit(customer: Customer) {
    this.store.dispatch(
      CustomerActions.update({
        customer: { ...customer, id: this.customerId },
      })
    );
  }

  remove(customer: Customer) {
    this.store.dispatch(
      CustomerActions.remove({ customer: { ...customer, id: this.customerId } })
    );
  }

  private verifyCustomer(customer$: Observable<undefined | Customer>) {
    function customerGuard(
      customer: undefined | Customer
    ): customer is Customer {
      return customer !== undefined;
    }

    return customer$.pipe(filter(customerGuard));
  }
}
