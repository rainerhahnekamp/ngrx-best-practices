import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Booking, BookingData } from '@eternal/booking/api';
import { CustomerData } from '@eternal/customer/data';
import { Customer } from '@eternal/customer/model';
import { CustomerBooking } from '@eternal/customer/ui';
import { User, UserData } from '@eternal/user/api';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'eternal-customer-booking-container',
  template: ` <eternal-customer-booking
    *ngIf="customerBookings$ | async as customerBookings"
    [customerBookings]="customerBookings"
  ></eternal-customer-booking>`
})
export class CustomerBookingContainerComponent implements OnInit {
  customerBookings$: Observable<CustomerBooking[]>;

  constructor(
    private route: ActivatedRoute,
    private customerData: CustomerData,
    private userData: UserData,
    private bookingData: BookingData
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params.id);
    this.customerBookings$ = combineLatest([this.customerData.getById(id), this.userData.user$, this.bookingData.bookings$]).pipe(
      map(([customer, user, bookings]) => this.map(customer, user, bookings))
    );
  }

  private map(customer: Customer, currentUser: User, bookings: Booking[]): CustomerBooking[] {
    const isCurrentUser = currentUser.fullName === `${customer.firstname} ${customer.name}`;
    return bookings
      .filter((booking) => booking.customerId === customer.id)
      .map((booking) => ({
        id: booking.id,
        name: booking.destination,
        cancelStatus: this.getCancelStatus(isCurrentUser, booking.cancellable)
      }));
  }

  private getCancelStatus(isCurrentUser: boolean, isCancellable: boolean) {
    if (!isCurrentUser) {
      return 'none';
    }

    return isCancellable ? 'cancellable' : 'notCancellable';
  }
}
