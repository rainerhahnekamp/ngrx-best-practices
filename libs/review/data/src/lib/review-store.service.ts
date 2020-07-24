import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

export interface Review {
  id: number;
  customerId: number;
  destination: string;
  subject: string;
  content: string;
  rating: number;
}

@Injectable({ providedIn: 'root' })
export class ReviewStore {
  constructor() {}

  get reviews$(): Observable<Review[]> {
    return of([
      {
        id: 1,
        customerId: 1,
        destination: 'China',
        rating: 5,
        subject: 'Wonderful',
        content: `I've travelled around China for 14 days. It was fantastic.<br>The country is so huge and I am sure if I would do the same trip again it would be a complete different holiday.<br>My highlights: <ul><li>Chinese Wall</li><li>Xian</li><li>Longsheng Rice Terraces</li>`,
      },
      {
        id: 2,
        customerId: 1,
        destination: 'Austrian Rush',
        rating: 3,
        subject: 'Weather was not so good',
        content:
          'We visited Austria in the summer for 10 days. The country is quite nice. Despite its size it has much varitey to offer and the people are very funny.<br>Unfortunately, the weather spoiled everything. It rained each day.',
      },
    ]);
  }
}
