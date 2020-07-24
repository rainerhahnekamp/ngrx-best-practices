import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Customer } from '@eternal/customer/domain';
import { formly } from 'ngx-formly-helpers';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { countries } from '../countries';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'eternal-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss'],
})
export class CustomerEditComponent implements OnInit {
  @Input() customer: Customer;
  @Output() save = new EventEmitter<Customer>();
  @Output() remove = new EventEmitter<Customer>();

  formGroup = new FormGroup({});
  fields: FormlyFieldConfig[];

  constructor() {}

  ngOnInit(): void {
    this.fields = [
      formly.requiredText('firstname', 'Firstname'),
      formly.requiredText('name', 'Name'),
      formly.requiredSelect('country', 'Country', countries),
      formly.requiredDate('birthdate', 'Birthdate'),
      formly.hidden('bookings'),
    ];
  }

  submit(customer: Customer) {
    if (this.formGroup.valid) {
      this.save.emit(customer);
    }
  }
}
