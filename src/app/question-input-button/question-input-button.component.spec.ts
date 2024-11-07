import {ComponentFixture, TestBed} from '@angular/core/testing';

import {QuestionInputButtonComponent} from './question-input-button.component';

describe('QuestionInputButtonComponent', () => {
  let component: QuestionInputButtonComponent;
  let fixture: ComponentFixture<QuestionInputButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionInputButtonComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(QuestionInputButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
