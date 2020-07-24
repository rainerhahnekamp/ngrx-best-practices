import { Component, Input } from '@angular/core';

export interface CustomerBooking {
  id: number;
  name: string;
  cancelStatus: 'none' | 'cancellable' | 'notCancellable';
}

@Component({
  selector: 'eternal-customer-booking',
  templateUrl: './customer-booking.component.html',
  styleUrls: ['./customer-booking.component.scss'],
})
export class CustomerBookingComponent {
  @Input() customerBookings: CustomerBooking[];
}
