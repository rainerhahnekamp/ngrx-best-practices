import { async, TestBed } from '@angular/core/testing';
import { ReviewDataModule } from './review-data.module';

describe('ReviewDataModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReviewDataModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ReviewDataModule).toBeDefined();
  });
});
