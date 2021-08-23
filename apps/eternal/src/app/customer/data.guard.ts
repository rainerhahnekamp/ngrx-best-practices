import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { CustomerActions } from './+state/customer.actions';
import { CustomerAppState } from './+state/customer.reducer';
import { fromCustomer } from './+state/customer.selectors';

@Injectable({
  providedIn: 'root',
})
export class DataGuard implements CanActivate {
  constructor(private store: Store<CustomerAppState>) {}

  canActivate(): Observable<boolean> {
    this.store.dispatch(CustomerActions.get());
    return this.store
      .select(fromCustomer.isLoaded)
      .pipe(filter((isLoaded) => isLoaded));
  }
}
