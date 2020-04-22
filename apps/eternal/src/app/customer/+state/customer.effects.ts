import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap, concatMap } from 'rxjs/operators';
import { Customer } from '../customer';
import { CustomerActions } from './customer.actions';
import { Router } from '@angular/router';

@Injectable()
export class CustomerEffects {
  private baseUrl = 'https://local.eternal.com/api/customer';
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}

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
