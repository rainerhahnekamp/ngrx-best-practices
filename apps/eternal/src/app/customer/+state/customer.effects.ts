import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { Customer } from '../customer';
import { CustomerActions } from './customer.actions';

@Injectable()
export class CustomerEffects {
  private baseUrl = 'http://www.angular.at/api/Customer';
  constructor(private actions$: Actions, private http: HttpClient) {}

  loadCustomers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.load),
      switchMap(() => this.http.get<Customer[]>(this.baseUrl)),
      map(customers => CustomerActions.loaded({ customers }))
    )
  );

  addCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.add),
      switchMap(({ customer }) =>
        this.http.post<Customer>(this.baseUrl, customer)
      ),
      map(customer => CustomerActions.added({ customer }))
    )
  );

  updateCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.update),
      switchMap(({ customer }) =>
        this.http.post<Customer>(this.baseUrl, customer)
      ),
      map(customer => CustomerActions.updated({ customer }))
    )
  );
}
