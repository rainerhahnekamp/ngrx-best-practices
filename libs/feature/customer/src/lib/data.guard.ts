import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import {
  CustomerAppState,
  CustomerActions,
  fromCustomer
} from '@eternal/data/customer';

@Injectable({
  providedIn: 'root'
})
export class DataGuard implements CanActivate {
  constructor(private store: Store<CustomerAppState>) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.store.dispatch(CustomerActions.get());
    return this.store
      .select(fromCustomer.isLoaded)
      .pipe(filter(isLoaded => isLoaded));
  }
}
