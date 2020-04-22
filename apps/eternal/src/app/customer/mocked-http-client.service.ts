import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Customer } from './customer';
import { customers } from './data';

@Injectable()
export class MockedHttpClient {
  get(url: string): Observable<Customer[]> {
    return of(customers);
  }

  post<T>(url: string, body: any): Observable<T> {
    return of(null);
  }
}
