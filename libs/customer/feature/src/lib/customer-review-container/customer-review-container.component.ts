import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Review, ReviewStore } from '@eternal/review/data';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomerReview } from '@eternal/customer/ui';
import { CustomerStore } from '@eternal/customer/data';

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
  reviews$: Observable<CustomerReview[]>;

  constructor(
    private customerStore: CustomerStore,
    private reviewStore: ReviewStore
  ) {}

  ngOnInit(): void {
    this.reviews$ = combineLatest([
      this.customerStore.selected$,
      this.reviewStore.reviews$
    ]).pipe(
      map(([customer, reviews]) =>
        reviews
          .filter(review => review.customerId === customer.id)
          .map(review => ({
            title: review.subject,
            content: review.content,
            rating: review.rating
          }))
      )
    );
  }
}
