import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerStore } from '@eternal/customer/data';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  constructor(private route: ActivatedRoute, private store: CustomerStore) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.params.id);
    this.name$ = this.store
      .getById(id)
      .pipe(map(customer => `${customer.firstname} ${customer.name}`));
  }
}
