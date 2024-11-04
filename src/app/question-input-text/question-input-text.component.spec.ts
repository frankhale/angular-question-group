import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionInputTextComponent } from './question-input-text.component';

describe('QuestionInputComponent', () => {
  let component: QuestionInputTextComponent;
  let fixture: ComponentFixture<QuestionInputTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionInputTextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionInputTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
