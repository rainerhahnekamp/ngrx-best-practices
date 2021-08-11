import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CustomerActions } from '../+state/customer.actions';
import { fromCustomer } from '../+state/customer.selectors';

@Component({
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent {
  customers$ = this.store.select(fromCustomer.selectAll);

  constructor(private store: Store) {
    this.store.dispatch(CustomerActions.load());
  }
}
