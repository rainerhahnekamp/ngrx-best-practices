import { TestBed } from '@angular/core/testing';

import { DataGuard } from './data.guard';

describe('DataGuard', () => {
  let guard: DataGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DataGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
