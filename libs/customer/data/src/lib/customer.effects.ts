import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '@eternal/customer/domain';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import {
  concatMap,
  filter,
  map,
  switchMap,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import { CustomerActions } from './customer.actions';
import { CustomerAppState, LoadStatus } from './customer.reducer';
import { fromCustomer } from './customer.selectors';

@Injectable()
export class CustomerEffects {
  private baseUrl = 'https://local.eternal.com/api/customer';
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private store: Store<CustomerAppState>
  ) {}

  getCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.get),
      concatMap(action =>
        of(action).pipe(
          withLatestFrom(this.store.select(fromCustomer.selectLoadStatus))
        )
      ),
      filter(([action, loadStatus]) => loadStatus === LoadStatus.NOT_LOADED),
      map(() => CustomerActions.load())
    )
  );

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
      concatMap(({ customer, redirectSupplier }) =>
        this.http
          .post<{ id: number; customers: Customer[] }>(this.baseUrl, customer)
          .pipe(
            map(({ customers, id }) => ({
              customers,
              redirect: redirectSupplier(id)
            }))
          )
      ),
      map(payload => CustomerActions.added(payload)),
      tap(({ redirect }) => this.router.navigateByUrl(redirect))
    )
  );

  updateCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.update),
      concatMap(({ customer, redirect }) =>
        this.http
          .put<Customer[]>(this.baseUrl, customer)
          .pipe(map(customers => ({ customers, redirect })))
      ),
      map(payload => CustomerActions.updated(payload)),
      tap(({ redirect }) => this.router.navigateByUrl(redirect))
    )
  );

  removeCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.remove),
      concatMap(({ customer, redirect }) =>
        this.http
          .delete<Customer[]>(`${this.baseUrl}/${customer.id}`)
          .pipe(map(customers => ({ customers, redirect })))
      ),
      map(payload => CustomerActions.removed(payload)),
      tap(({ redirect }) => this.router.navigateByUrl(redirect))
    )
  );
}
