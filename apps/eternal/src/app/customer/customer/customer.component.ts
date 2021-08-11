import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { formly } from 'ngx-formly-helpers';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CustomerActions } from '../+state/customer.actions';
import { CustomerAppState } from '../+state/customer.reducer';
import { fromCustomer } from '../+state/customer.selectors';
import { countries } from '../countries';
import { Customer } from '../customer';

@Component({
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
  formGroup = new FormGroup({});
  customer$: Observable<Customer> | undefined;
  fields: FormlyFieldConfig[] = [
    formly.requiredText('firstname', 'Firstname'),
    formly.requiredText('name', 'Name'),
    formly.requiredSelect('country', 'Country', countries),
    formly.requiredDate('birthdate', 'Birthdate'),
  ];

  constructor(
    private store: Store<CustomerAppState>,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.store.dispatch(CustomerActions.load());
    if (this.route.snapshot.data.mode === 'new') {
      this.customer$ = of({
        id: 0,
        firstname: '',
        name: '',
        country: '',
        birthdate: '',
      });
    } else {
      this.customer$ = this.store
        .select(
          fromCustomer.selectById(Number(this.route.snapshot.params.id || ''))
        )
        .pipe(
          this.verifyCustomer,
          map((customer) => ({ ...customer }))
        );
    }
  }

  submit(customer: Customer) {
    if (this.formGroup.valid) {
      if (customer.id) {
        this.store.dispatch(CustomerActions.update({ customer }));
      } else {
        this.store.dispatch(CustomerActions.add({ customer }));
      }
    }
  }

  remove(customer: Customer) {
    if (confirm(`Really delete ${customer}?`)) {
      this.store.dispatch(CustomerActions.remove({ customer }));
    }
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
