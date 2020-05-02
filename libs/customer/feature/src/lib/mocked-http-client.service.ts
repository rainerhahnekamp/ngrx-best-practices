import { Injectable } from '@angular/core';
import { Customer } from '@eternal/customer/domain';
import { sortBy } from 'lodash';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { customers as originalCustomers } from './data';

@Injectable()
export class MockedHttpClient {
  private customers = originalCustomers;

  get(url: string): Observable<Customer[]> {
    return this.getCustomers('GET', url);
  }

  post(url: string, customer: Customer): Observable<Customer[]> {
    this.customers.push({ ...customer, id: this.getNextId() });
    return this.getCustomers('POST', url, customer);
  }

  put(url: string, customer: Customer): Observable<Customer[]> {
    this.customers = this.customers.map(c => {
      if (c.id === customer.id) {
        return customer;
      }
      return c;
    });
    return this.getCustomers('PUT', url, customer);
  }

  delete(url: string): Observable<Customer[]> {
    const id = Number(url.match(/(\d+)$/)[0]);
    this.customers = this.customers.filter(customer => customer.id !== id);
    return this.getCustomers('DELETE', url);
  }

  getCustomers(
    httpMethod: string,
    url: string,
    body?: any
  ): Observable<Customer[]> {
    const customers = sortBy(this.customers, 'name');
    return of(customers).pipe(
      delay(Math.random() * 1000),
      tap(() => {
        console.group('Mocked Http Client');
        console.log(`${httpMethod}: ${url}`);
        if (body) {
          console.log(`Body: ${JSON.stringify(body)}`);
        }
        console.log(customers);
        console.groupEnd();
      })
    );
  }

  getNextId() {
    return Math.max(...this.customers.map(customer => customer.id)) + 1;
  }
}
