import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerActions, CustomerAppState } from '@eternal/customer/data';
import { Customer } from '@eternal/customer/model';
import { Store } from '@ngrx/store';

@Component({
  template: ` <eternal-customer [customer]="customer" (save)="add($event)"></eternal-customer> `
})
export class AddContainerComponent {
  public customer = {
    id: 0,
    firstname: '',
    name: '',
    country: null,
    birthdate: null
  };

  constructor(private route: ActivatedRoute, private router: Router, private store: Store<CustomerAppState>) {}

  add(customer: Customer) {
    this.store.dispatch(
      CustomerActions.add({
        customer,
        redirectSupplier: (id) =>
          this.router.createUrlTree(['..', 'welcome', id], {
            relativeTo: this.route
          })
      })
    );
  }
}
