import { Component, Input, TemplateRef } from '@angular/core';
import { Customer } from '@eternal/customer/model';

@Component({
  selector: 'eternal-customer',
  templateUrl: './customer.component.html'
})
export class CustomerComponent {
  @Input() customer: Customer;
  @Input() tab1: TemplateRef<unknown>;
  @Input() tab2: TemplateRef<unknown>;
  @Input() tab3: TemplateRef<unknown>;
  @Input() tab1Label: string;
  @Input() tab2Label: string;
  @Input() tab3Label: string;
}
