import { Component, OnInit, Input } from '@angular/core';
import { pad } from 'lodash';

export interface CustomerReview {
  title: string;
  content: string;
  rating: number;
}

@Component({
  selector: 'eternal-customer-review',
  templateUrl: './customer-review.component.html',
  styleUrls: ['./customer-review.component.css'],
})
export class CustomerReviewComponent {
  @Input() reviews: CustomerReview[];

  stars(n: number): string {
    return pad('', n, '⭐');
  }
}
