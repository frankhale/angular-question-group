import {ComponentFixture, TestBed} from '@angular/core/testing';

import {QuestionInputRadioGroupComponent} from './question-input-radio-group.component';

describe('QuestionInputRadioGroupComponent', () => {
  let component: QuestionInputRadioGroupComponent;
  let fixture: ComponentFixture<QuestionInputRadioGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionInputRadioGroupComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(QuestionInputRadioGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
