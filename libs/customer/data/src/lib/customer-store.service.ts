import { Injectable } from '@angular/core';
import { UrlTree } from '@angular/router';
import { Customer } from '@eternal/customer/domain';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Context, CustomerActions } from './customer.actions';
import { fromCustomer } from './customer.selectors';

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

  public add(customer: Customer, redirectSupplier: (id: number) => UrlTree) {
    this.store.dispatch(CustomerActions.add({ customer, redirectSupplier }));
  }

  public update(customer: Customer, redirect: UrlTree) {
    this.store.dispatch(CustomerActions.update({ customer, redirect }));
  }

  public remove(customer: Customer, redirect: UrlTree) {
    this.store.dispatch(CustomerActions.remove({ customer, redirect }));
  }
}
