import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionInputPlaceholderComponent } from './question-input-placeholder.component';

describe('QuestionInputPlaceholderComponent', () => {
  let component: QuestionInputPlaceholderComponent;
  let fixture: ComponentFixture<QuestionInputPlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionInputPlaceholderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionInputPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
