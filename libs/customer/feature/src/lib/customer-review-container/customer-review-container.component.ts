import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerReview } from '@eternal/customer/ui';
import { ReviewData } from '@eternal/review/api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'eternal-customer-review-container',
  template: ` <eternal-customer-review *ngIf="reviews$ | async as reviews" [reviews]="reviews"></eternal-customer-review>`
})
export class CustomerReviewContainerComponent implements OnInit {
  reviews$: Observable<CustomerReview[]>;

  constructor(private route: ActivatedRoute, private reviewData: ReviewData) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params.id);
    this.reviews$ = this.reviewData.reviews$.pipe(
      map((reviews) =>
        reviews
          .filter((review) => review.customerId === id)
          .map((review) => ({
            title: review.subject,
            content: review.content,
            rating: review.rating
          }))
      )
    );
  }
}
