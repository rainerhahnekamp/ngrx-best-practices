import { Component, Input } from '@angular/core';
import { Customer } from '@eternal/domain/customer';

@Component({
  selector: 'eternal-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent {
  @Input() customers: Customer[];

  constructor() {}
}
