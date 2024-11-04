import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionInputDateComponent } from './question-input-date.component';

describe('QuestionInputDateComponent', () => {
  let component: QuestionInputDateComponent;
  let fixture: ComponentFixture<QuestionInputDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionInputDateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionInputDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
