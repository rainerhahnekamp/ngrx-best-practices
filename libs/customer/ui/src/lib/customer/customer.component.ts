import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Customer } from '@eternal/customer/domain';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { formly } from 'ngx-formly-helpers';
import { countries } from '../countries';

interface Booking {
  id: number;
  name: string;
  cancelStatus: 'none' | 'cancellable' | 'notCancellable';
}

export interface CustomerViewModel extends Customer {
  bookings: Booking[];
}

@Component({
  selector: 'eternal-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  formGroup = new FormGroup({});
  @Input() customer: CustomerViewModel;
  @Output() save = new EventEmitter<Customer>();
  @Output() remove = new EventEmitter<Customer>();
  fields: FormlyFieldConfig[];
  constructor() {}

  ngOnInit() {
    this.fields = [
      formly.requiredText('firstname', 'Firstname'),
      formly.requiredText('name', 'Name'),
      formly.requiredSelect('country', 'Country', countries),
      formly.requiredDate('birthdate', 'Birthdate'),
      formly.hidden('bookings')
    ];
  }

  submit(customer: Customer) {
    if (this.formGroup.valid) {
      this.save.emit(customer);
    }
  }
}
