import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomerAppState, fromCustomer } from '@eternal/customer/data';

@Component({
  template: `
    <eternal-welcome
      *ngIf="name$ | async as name"
      [name]="name"
    ></eternal-welcome>
  `
})
export class WelcomeContainerComponent implements OnInit {
  name$: Observable<string>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<CustomerAppState>
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.params.id);
    this.name$ = this.store
      .select(fromCustomer.selectById, id)
      .pipe(map(customer => `${customer.firstname} ${customer.name}`));
  }
}
