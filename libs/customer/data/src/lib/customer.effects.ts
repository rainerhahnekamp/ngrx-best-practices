import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '@eternal/customer/domain';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { isEqual } from 'lodash';
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
import { CustomerAppState } from './customer.reducer';
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
          withLatestFrom(this.store.select(fromCustomer.selectContext))
        )
      ),
      filter(([action, context]) => !isEqual(context, action.context)),
      map(([action]) => CustomerActions.load({ context: action.context }))
    )
  );

  loadCustomers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.load),
      switchMap(action =>
        this.http.get<Customer[]>(this.baseUrl, {
          params: new HttpParams()
            .set('page', '' + action.context.page)
            .set('name', action.context.name)
            .set('country', action.context.country)
        })
      ),
      map(customers => CustomerActions.loaded({ customers }))
    )
  );

  getById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.getById),
      concatMap(action =>
        of(action).pipe(
          withLatestFrom(this.store.select(fromCustomer.selectAll))
        )
      ),
      filter(([{ id }, totalCustomers]) => !totalCustomers[id]),
      map(([action]) => CustomerActions.loadById({ id: action.id }))
    )
  );

  loadById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.loadById),
      switchMap(action =>
        this.http.get<Customer>(`${this.baseUrl}/${action.id}`)
      ),
      map(customer => CustomerActions.loadedById({ customer }))
    )
  );

  addCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.add),
      concatMap(({ customer }) =>
        this.http.post<Customer[]>(this.baseUrl, customer)
      ),
      map(customers => CustomerActions.added({ customers })),
      tap(() => this.router.navigateByUrl('/customer'))
    )
  );

  updateCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.update),
      concatMap(({ customer }) =>
        this.http.put<Customer[]>(this.baseUrl, customer)
      ),
      map(customers => CustomerActions.updated({ customers })),
      tap(() => this.router.navigateByUrl('/customer'))
    )
  );

  removeCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.remove),
      concatMap(({ customer }) =>
        this.http.delete<Customer[]>(`${this.baseUrl}/${customer.id}`)
      ),
      map(customers => CustomerActions.removed({ customers })),
      tap(() => this.router.navigateByUrl('/customer'))
    )
  );
}
