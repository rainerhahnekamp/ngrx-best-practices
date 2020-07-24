import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerBookingContainerComponent } from './customer-booking-container.component';

describe('CustomerBookingContainerComponent', () => {
  let component: CustomerBookingContainerComponent;
  let fixture: ComponentFixture<CustomerBookingContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerBookingContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerBookingContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
