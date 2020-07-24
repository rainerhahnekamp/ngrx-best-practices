import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerStore } from '@eternal/customer/data';
import { Customer } from '@eternal/customer/domain';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './customer-container.component.html',
})
export class CustomerContainerComponent implements OnInit {
  customer$: Observable<Customer>;
  constructor(private route: ActivatedRoute, private store: CustomerStore) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.params.id);
    this.customer$ = this.store.getById(id);
  }
}
