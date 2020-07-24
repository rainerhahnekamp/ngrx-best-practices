import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerContainerComponent } from './customer-container.component';

describe('CustomerContainerComponent', () => {
  let component: CustomerContainerComponent;
  let fixture: ComponentFixture<CustomerContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
