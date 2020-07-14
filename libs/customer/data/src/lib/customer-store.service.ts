import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Customer } from '@eternal/customer/domain';
import { fromCustomer } from './customer.selectors';
import { Observable } from 'rxjs';
import { CustomerActions } from './customer.actions';
import { map } from 'rxjs/operators';
import { UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CustomerStore {
  private isGetDispatched = false;

  get customers$(): Observable<Customer[]> {
    this.checkForGet();
    return this.store.select(fromCustomer.selectAll);
  }

  get isLoaded$(): Observable<boolean> {
    this.checkForGet();
    return this.store.select(fromCustomer.isLoaded);
  }

  constructor(private store: Store<CustomerStore>) {}

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
    return this.store
      .select(fromCustomer.selectById, id)
      .pipe(map(customer => ({ ...customer })));
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

  private checkForGet() {
    if (!this.isGetDispatched) {
      this.store.dispatch(CustomerActions.get());
      this.isGetDispatched = true;
    }
  }
}
