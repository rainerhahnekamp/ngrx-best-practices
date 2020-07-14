import { Injectable } from '@angular/core';
import { Customer } from '@eternal/customer/domain';
import { sortBy } from 'lodash';
import { Observable, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { customers as originalCustomers } from './data';

@Injectable()
export class MockedHttpClient {
  private customers = originalCustomers;

  get(url: string): Observable<Customer[]> {
    return this.sortCustomers().pipe(this.logRequest('GET', url));
  }

  post(
    url: string,
    customer: Customer
  ): Observable<{ customers: Customer[]; id: number }> {
    const nextId = this.getNextId();
    this.customers.push({ ...customer, id: nextId });
    return this.sortCustomers().pipe(
      map(customers => ({ customers, id: nextId })),
      this.logRequest('POST', url, customer)
    );
  }

  put(url: string, customer: Customer): Observable<Customer[]> {
    this.customers = this.customers.map(c => {
      if (c.id === customer.id) {
        return customer;
      }
      return c;
    });
    return this.sortCustomers().pipe(this.logRequest('PUT', url, customer));
  }

  delete(url: string): Observable<Customer[]> {
    const id = Number(url.match(/(\d+)$/)[0]);
    this.customers = this.customers.filter(customer => customer.id !== id);
    return this.sortCustomers().pipe(this.logRequest('DELETE', url));
  }

  private sortCustomers(): Observable<Customer[]> {
    const customers = sortBy(this.customers, 'name');
    return of(customers).pipe();
  }

  private logRequest(httpMethod: string, url: string, body?: any) {
    return (observable: Observable<any>) =>
      observable.pipe(
        delay(Math.random() * 1000),
        tap(response => {
          console.group('Mocked Http Client');
          console.log(`${httpMethod}: ${url}`);
          if (body) {
            console.log(`Body: ${JSON.stringify(body)}`);
          }
          console.log(response);
          console.groupEnd();
        })
      );
  }

  getNextId() {
    return Math.max(...this.customers.map(customer => customer.id)) + 1;
  }
}
