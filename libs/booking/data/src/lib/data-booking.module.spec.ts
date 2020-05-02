import { async, TestBed } from '@angular/core/testing';
import { DataBookingModule } from './data-booking.module';

describe('DataBookingModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DataBookingModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(DataBookingModule).toBeDefined();
  });
});
