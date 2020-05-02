import { TestBed } from '@angular/core/testing';

import { CustomerStore } from './customer-store.service';

describe('CustomerStoreService', () => {
  let service: CustomerStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
