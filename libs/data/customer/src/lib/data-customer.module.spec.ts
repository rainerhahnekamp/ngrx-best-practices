import { async, TestBed } from '@angular/core/testing';
import { DataCustomerModule } from './data-customer.module';

describe('DataCustomerModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DataCustomerModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(DataCustomerModule).toBeDefined();
  });
});
