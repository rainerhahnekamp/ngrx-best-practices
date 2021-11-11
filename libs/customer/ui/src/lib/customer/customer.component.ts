import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Customer } from '@eternal/customer/model';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { formly } from 'ngx-formly-helpers';
import { countries } from '../countries';

@Component({
  selector: 'eternal-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent {
  formGroup = new FormGroup({});
  @Input() customer: Customer | undefined;
  @Output() save = new EventEmitter<Customer>();
  @Output() remove = new EventEmitter<Customer>();
  fields: FormlyFieldConfig[] = [
    formly.requiredText('firstname', 'Firstname'),
    formly.requiredText('name', 'Name'),
    formly.requiredSelect('country', 'Country', countries),
    formly.requiredDate('birthdate', 'Birthdate'),
  ];

  submit(customer: Customer) {
    if (this.formGroup.valid) {
      this.save.emit(this.formGroup.value);
    }
  }

  handleRemove(customer: Customer) {
    if (confirm(`Really delete ${customer}?`)) {
      this.remove.emit(this.customer);
    }
  }
}
