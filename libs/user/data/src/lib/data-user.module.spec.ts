import { async, TestBed } from '@angular/core/testing';
import { DataUserModule } from './data-user.module';

describe('DataUserModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DataUserModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(DataUserModule).toBeDefined();
  });
});
