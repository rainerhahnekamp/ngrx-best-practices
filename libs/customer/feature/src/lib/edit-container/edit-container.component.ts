import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';
import { Booking, BookingData } from '@eternal/booking/api';
import { CustomerData } from '@eternal/customer/data';
import { Customer } from '@eternal/customer/model';
import { CustomerViewModel } from '@eternal/customer/ui';
import { User, UserData } from '@eternal/user/api';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  template: `
    <eternal-customer
      *ngIf="customer$ | async as customer"
      [customer]="customer"
      (save)="edit($event)"
      (remove)="remove($event)"
    ></eternal-customer>
  `
})
export class EditContainerComponent implements OnInit {
  customer$: Observable<CustomerViewModel>;
  private redirect: UrlTree;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerData: CustomerData,
    private userData: UserData,
    private bookingData: BookingData
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params.id);
    this.customer$ = combineLatest([this.customerData.getById(id), this.userData.user$, this.bookingData.bookings$]).pipe(
      map(([customer, user, bookings]) => this.mapToViewModel(customer, user, bookings))
    );
    this.redirect = this.router.createUrlTree(['..'], {
      relativeTo: this.route
    });
  }

  edit(customer: Customer) {
    this.customerData.update(customer, this.redirect);
  }

  remove(customer: Customer) {
    if (confirm(`Really delete ${customer}?`)) {
      this.customerData.remove(customer, this.redirect);
    }
  }

  private mapToViewModel(customer: Customer, currentUser: User, bookings: Booking[]): CustomerViewModel {
    const isCurrentUser = currentUser.fullName === `${customer.firstname} ${customer.name}`;
    return {
      ...customer,
      bookings: bookings
        .filter((booking) => booking.customerId === customer.id)
        .map((booking) => ({
          id: booking.id,
          name: booking.destination,
          cancelStatus: this.getCancelStatus(isCurrentUser, booking.cancellable)
        }))
    };
  }

  private getCancelStatus(isCurrentUser: boolean, isCancellable: boolean) {
    if (!isCurrentUser) {
      return 'none';
    }

    return isCancellable ? 'cancellable' : 'notCancellable';
  }
}
