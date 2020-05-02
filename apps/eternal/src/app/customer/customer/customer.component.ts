import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  formGroup = new FormGroup({});
  customer$: Observable<Customer>;
  fields: FormlyFieldConfig[];
  constructor(
    private store: Store<CustomerAppState>,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.fields = [
      formly.requiredText('firstname', 'Firstname'),
      formly.requiredText('name', 'Name'),
      formly.requiredSelect('country', 'Country', countries),
      formly.requiredDate('birthdate', 'Birthdate')
    ];
    this.store.dispatch(CustomerActions.load());
    if (this.route.snapshot.data.mode === 'new') {
      this.customer$ = of({
        id: 0,
        firstname: '',
        name: '',
        country: null,
        birthdate: null
      });
    } else {
      this.customer$ = this.store
        .select(fromCustomer.selectById, Number(this.route.snapshot.params.id))
        .pipe(
          filter(customer => !!customer),
          map(customer => ({ ...customer }))
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
}
