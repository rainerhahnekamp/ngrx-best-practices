import { Component, Input, TemplateRef } from '@angular/core';
import { Customer } from '@eternal/customer/domain';

@Component({
  selector: 'eternal-customer',
  templateUrl: './customer.component.html',
})
export class CustomerComponent {
  @Input() customer: Customer;
  @Input() tab1: TemplateRef<any>;
  @Input() tab2: TemplateRef<any>;
  @Input() tab3: TemplateRef<any>;
  @Input() tab1Label: string;
  @Input() tab2Label: string;
  @Input() tab3Label: string;
}
