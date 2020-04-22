import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Customer } from './customer';
import { customers as originalCustomers } from './data';
import { sortBy } from 'lodash';

@Injectable()
export class MockedHttpClient {
  private customers = originalCustomers;

  get(url: string): Observable<Customer[]> {
    return this.getCustomers();
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
