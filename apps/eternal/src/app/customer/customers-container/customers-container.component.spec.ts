import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersContainerComponent } from './customers-container.component';

describe('CustomersContainerComponent', () => {
  let component: CustomersContainerComponent;
  let fixture: ComponentFixture<CustomersContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomersContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
