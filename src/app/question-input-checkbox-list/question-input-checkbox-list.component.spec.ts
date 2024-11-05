import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionInputCheckboxListComponent } from './question-input-checkbox-list.component';

describe('QuestionInputCheckboxListComponent', () => {
  let component: QuestionInputCheckboxListComponent;
  let fixture: ComponentFixture<QuestionInputCheckboxListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionInputCheckboxListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionInputCheckboxListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
