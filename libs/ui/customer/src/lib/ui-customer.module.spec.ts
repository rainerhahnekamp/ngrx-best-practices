import { async, TestBed } from '@angular/core/testing';
import { UiCustomerModule } from './ui-customer.module';

describe('UiCustomerModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UiCustomerModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(UiCustomerModule).toBeDefined();
  });
});
