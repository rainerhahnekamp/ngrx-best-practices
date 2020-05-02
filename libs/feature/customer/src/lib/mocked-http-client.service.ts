import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '@eternal/domain/customer';
import { sortBy, fromPairs } from 'lodash';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
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

    let customers = this.getSortedCustomers();
    const name = params.get('name');
    if (name) {
      const regex = new RegExp(name, 'i');
      customers = customers.filter(customer =>
        (customer.name + customer.firstname).match(regex)
      );
    }

    const country = params.get('country');
    if (country) {
      customers = customers.filter(customer => customer.country === country);
    }

    return this.logAndDelay(
      customers.slice((page - 1) * this.pageSize, page * this.pageSize),
      'GET',
      url,
      fromPairs(params.keys().map(key => [key, params.get(key)]))
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
    return this.logAndDelay(this.getSortedCustomers(), httpMethod, url, body);
  }

  getSortedCustomers(): Customer[] {
    return sortBy(this.customers, 'name');
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
