import { Injectable } from '@angular/core';
import { sortBy } from 'lodash';
import { Observable, of } from 'rxjs';
import { customers as originalCustomers } from './data';
import { Customer } from '@eternal/domain/customer';
import { map, filter, count, timeout } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';

interface FilterOptions {
  name: string;
  country: string;
  page: string;
}

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
        timeout(250)
      );
    }

    const params = httpOptions.params;
    const page = Number(params.get('page'));

    return this.getCustomers().pipe(
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
      timeout(250)
    );
  }

  post(url: string, customer: Customer): Observable<Customer[]> {
    this.customers.push({ ...customer, id: this.getNextId() });
    return this.getCustomers();
  }

  put(url: string, customer: Customer): Observable<Customer[]> {
    this.customers = this.customers.map(c => {
      if (c.id === customer.id) {
        return customer;
      }
      return c;
    });
    return this.getCustomers();
  }

  delete(url: string): Observable<Customer[]> {
    const id = Number(url.match(/(\d+)$/)[0]);
    this.customers = this.customers.filter(customer => customer.id !== id);
    return this.getCustomers();
  }

  getCustomers(): Observable<Customer[]> {
    return of(sortBy(this.customers, 'name'));
  }

  getNextId() {
    return Math.max(...this.customers.map(customer => customer.id)) + 1;
  }
}
