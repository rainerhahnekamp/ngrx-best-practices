import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { CustomerActions, fromCustomer } from '@eternal/customer/data';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataGuard implements CanActivate {
  constructor(private store: Store) {}

  canActivate(): Observable<boolean> {
    this.store.dispatch(CustomerActions.get());
    return this.store
      .select(fromCustomer.isLoaded)
      .pipe(filter((isLoaded) => isLoaded));
  }
}
