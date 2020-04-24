import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Customer } from '@eternal/domain/customer';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { formly } from 'ngx-formly-helpers';
import { countries } from '../countries';

@Component({
  selector: 'eternal-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  formGroup = new FormGroup({});
  @Input() customer: Customer;
  @Output() save = new EventEmitter<Customer>();
  @Output() remove = new EventEmitter<Customer>();
  fields: FormlyFieldConfig[];
  constructor() {}

  ngOnInit() {
    this.fields = [
      formly.requiredText('firstname', 'Firstname'),
      formly.requiredText('name', 'Name'),
      formly.requiredSelect('country', 'Country', countries),
      formly.requiredDate('birthdate', 'Birthdate')
    ];
  }

  submit(customer: Customer) {
    if (this.formGroup.valid) {
      this.save.emit(customer);
    }
  }
}
