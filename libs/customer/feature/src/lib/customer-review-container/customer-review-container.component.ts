import { Component, Input, OnInit } from '@angular/core';
import { CustomerReview } from '@eternal/customer/ui';
import { ReviewStore } from '@eternal/review/data';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'eternal-customer-review-container',
  template: `
    <eternal-customer-review
      *ngIf="reviews$ | async as reviews"
      [reviews]="reviews"
    ></eternal-customer-review>
  `
})
export class CustomerReviewContainerComponent implements OnInit {
  @Input() customerId: number;
  reviews$: Observable<CustomerReview[]>;

  constructor(private reviewStore: ReviewStore) {}

  ngOnInit(): void {
    this.reviews$ = this.reviewStore.reviews$.pipe(
      map(reviews =>
        reviews
          .filter(review => review.customerId === this.customerId)
          .map(review => ({
            title: review.subject,
            content: review.content,
            rating: review.rating
          }))
      )
    );
  }
}
