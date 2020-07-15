import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '@eternal/customer/domain';
import { fromPairs, sortBy } from 'lodash';
import { Observable, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { customers as originalCustomers } from './data';

@Injectable()
export class MockedHttpClient {
  private pageSize = 10;
  private customers = originalCustomers;

  get(
    url: string,
    httpOptions: { params: HttpParams }
  ): Observable<Customer[] | Customer> {
    const idMatch = url.match(/(\d+)$/);
    if (idMatch) {
      const id = Number(idMatch[0]);
      return of(this.customers.find(customer => customer.id === id)).pipe(
        this.logRequest('GET', url)
      );
    }

    const params = httpOptions.params;
    const page = Number(params.get('page'));

    return this.sortCustomers().pipe(
      map(customers => {
        const name = params.get('name');
        if (name) {
          const regex = new RegExp(name, 'i');
          customers = customers.filter(customer =>
            (customer.name + customer.firstname).match(regex)
          );
        }

        const country = params.get('country');
        if (country) {
          customers = customers.filter(
            customer => customer.country === country
          );
        }
        return customers.slice(
          (page - 1) * this.pageSize,
          page * this.pageSize
        );
      }),
      this.logRequest(
        'GET',
        url,
        fromPairs(params.keys().map(key => [key, params.get(key)]))
      )
    );
  }

  post(
    url: string,
    customer: Customer
  ): Observable<{ customers: Customer; id: number }> {
    const nextId = this.getNextId();
    const newCustomer = { ...customer, id: nextId };
    this.customers.push(newCustomer);
    return of({ customer, id: nextId }).pipe(
      this.logRequest('POST', url, customer)
    );
  }

  put(url: string, customer: Customer): Observable<Customer> {
    this.customers = this.customers.map(c => {
      if (c.id === customer.id) {
        return customer;
      }
      return c;
    });
    return of(customer).pipe(this.logRequest('PUT', url, customer));
  }

  delete(url: string): Observable<void> {
    const id = Number(url.match(/(\d+)$/)[0]);
    this.customers = this.customers.filter(customer => customer.id !== id);
    return of(null).pipe(this.logRequest('DELETE', url));
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

  private getNextId() {
    return Math.max(...this.customers.map(customer => customer.id)) + 1;
  }
}
