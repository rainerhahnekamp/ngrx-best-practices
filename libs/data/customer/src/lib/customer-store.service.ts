import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Customer } from '@eternal/domain/customer';
import { fromCustomer } from './customer.selectors';
import { Observable, combineLatest } from 'rxjs';
import { CustomerActions, Context } from './customer.actions';
import { map, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerStore {
  private _customers$: Observable<Customer[]>;

  get customers$(): Observable<Customer[]> {
    return this._customers$;
  }

  constructor(private store: Store<CustomerStore>) {
    this._customers$ = combineLatest([
      this.store.select(fromCustomer.selectCurrent),
      this.store.select(fromCustomer.isLoaded)
    ]).pipe(
      filter(([, isLoaded]) => isLoaded),
      map(([customers]) => customers)
    );
  }

  public newCustomer(): Customer {
    return {
      id: 0,
      firstname: '',
      name: '',
      country: '',
      birthdate: ''
    };
  }

  public getById(id: number) {
    this.store.dispatch(CustomerActions.getById({ id }));
    return this.store.select(fromCustomer.selectById, id).pipe(
      filter(customer => !!customer),
      map(customer => ({ ...customer }))
    );
  }

  public get(context: Context) {
    this.store.dispatch(CustomerActions.get({ context }));
  }

  public add(customer: Customer) {
    this.store.dispatch(CustomerActions.add({ customer }));
  }

  public update(customer: Customer) {
    this.store.dispatch(CustomerActions.update({ customer }));
  }

  public remove(customer: Customer) {
    this.store.dispatch(CustomerActions.remove({ customer }));
  }
}
