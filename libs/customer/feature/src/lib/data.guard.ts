import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { CustomerData } from '@eternal/customer/data';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataGuard implements CanActivate {
  constructor(private customerStore: CustomerData) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.customerStore.isLoaded$.pipe(filter((isLoaded) => isLoaded));
  }
}
