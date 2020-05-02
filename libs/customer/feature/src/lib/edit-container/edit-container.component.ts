import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomerViewModel } from '@eternal/customer/ui';
import { CustomerStore } from '@eternal/customer/data';
import { Customer } from '@eternal/customer/domain';
import { UserStore, User } from '@eternal/user/data';
import { BookingStore, Booking } from '@eternal/booking/data';

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
  constructor(
    private route: ActivatedRoute,
    private customerStore: CustomerStore,
    private userStore: UserStore,
    private bookingStore: BookingStore
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params.id);
    this.customer$ = combineLatest([
      this.customerStore.getById(id),
      this.userStore.user$,
      this.bookingStore.bookings$
    ]).pipe(
      map(([customer, user, bookings]) =>
        this.mapToViewModel(customer, user, bookings)
      )
    );
  }

  edit(customer: Customer) {
    this.customerStore.update(customer);
  }

  remove(customer: Customer) {
    if (confirm(`Really delete ${customer}?`)) {
      this.customerStore.remove(customer);
    }
  }

  private mapToViewModel(
    customer: Customer,
    currentUser: User,
    bookings: Booking[]
  ): CustomerViewModel {
    const isCurrentUser =
      currentUser.fullName === `${customer.firstname} ${customer.name}`;
    return {
      ...customer,
      bookings: bookings
        .filter(booking => booking.customerId === customer.id)
        .map(booking => ({
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
