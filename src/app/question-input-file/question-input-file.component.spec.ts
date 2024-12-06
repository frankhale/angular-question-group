import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionInputFileComponent } from './question-input-file.component';

describe('QuestionInputFileComponent', () => {
  let component: QuestionInputFileComponent;
  let fixture: ComponentFixture<QuestionInputFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionInputFileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionInputFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
