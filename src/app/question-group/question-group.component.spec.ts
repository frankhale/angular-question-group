import {ComponentFixture, TestBed} from '@angular/core/testing';

import {QuestionGroupComponent} from './question-group.component';

describe('QuestionGroupComponent', () => {
  let component: QuestionGroupComponent<string>;
  let fixture: ComponentFixture<QuestionGroupComponent<string>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionGroupComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(QuestionGroupComponent<string>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
