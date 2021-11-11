import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '@eternal/customer/model';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import {
  concatMap,
  filter,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { CustomerActions } from './customer.actions';
import { CustomerAppState } from './customer.reducer';
import { fromCustomer } from './customer.selectors';

@Injectable()
export class CustomerEffects {
  getCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.get),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(this.store.select(fromCustomer.selectLoadStatus))
        )
      ),
      filter(([action, loadStatus]) => loadStatus === 'NOT_LOADED'),
      map(() => CustomerActions.load())
    )
  );
  private baseUrl = 'https://local.eternal.com/api/customer';
  loadCustomers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.load),
      switchMap(() => this.http.get<Customer[]>(this.baseUrl)),
      map((customers) => CustomerActions.loaded({ customers }))
    )
  );
  addCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.add),
      concatMap(({ customer }) =>
        this.http.post<{ customers: Customer[]; id: number }>(
          this.baseUrl,
          customer
        )
      ),
      map(({ customers }) => CustomerActions.added({ customers })),
      tap(() => this.router.navigateByUrl('/customer'))
    )
  );

  updateCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.update),
      concatMap(({ customer }) =>
        this.http.put<Customer[]>(this.baseUrl, customer)
      ),
      map((customers) => CustomerActions.updated({ customers })),
      tap(() => this.router.navigateByUrl('/customer'))
    )
  );
  removeCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.remove),
      concatMap(({ customer }) =>
        this.http.delete<Customer[]>(`${this.baseUrl}/${customer.id}`)
      ),
      map((customers) => CustomerActions.removed({ customers })),
      tap(() => this.router.navigateByUrl('/customer'))
    )
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private store: Store<CustomerAppState>
  ) {}
}
