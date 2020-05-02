import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '@eternal/domain/customer';
import { sortBy } from 'lodash';
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
      return this.logAndDelay(
        this.customers.find(customer => customer.id === id),
        'GET',
        url
      );
    }

    const params = httpOptions.params;
    const page = Number(params.get('page'));

    return this.getCustomers('GET', url).pipe(
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
      })
    );
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
    return this.logAndDelay(customers, httpMethod, url, body);
  }

  logAndDelay<T extends Customer[] | Customer>(
    data: T,
    httpMethod: string,
    url: string,
    body?: any
  ): Observable<T> {
    return of(data).pipe(
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
