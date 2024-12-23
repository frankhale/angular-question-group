import {ComponentFixture, TestBed} from '@angular/core/testing';

import {QuestionComponent} from './question.component';

describe('QuestionComponent', () => {
  let component: QuestionComponent<string>;
  let fixture: ComponentFixture<QuestionComponent<string>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(QuestionComponent<string>);
    fixture.componentRef.setInput('name', 'question_one');
    fixture.componentRef.setInput(
      'question',
      'What is your name?');

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
