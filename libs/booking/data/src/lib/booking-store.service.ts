import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Booking {
  id: number;
  customerId: number;
  destination: string;
  cancellable: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class BookingStore {
  constructor() {}

  get bookings$(): Observable<Booking[]> {
    return of([
      {
        id: 1,
        customerId: 1,
        destination: 'Lovoten',
        cancellable: false
      },
      {
        id: 2,
        customerId: 2,
        destination: 'Angkor Wat',
        cancellable: false
      },
      {
        id: 3,
        customerId: 1,
        destination: 'Great Wall of China',
        cancellable: true
      },
      {
        id: 4,
        customerId: 1,
        destination: 'Death Valley',
        cancellable: true
      },
      {
        id: 5,
        customerId: 2,
        destination: 'Austria',
        cancellable: true
      }
    ]);
  }
}
