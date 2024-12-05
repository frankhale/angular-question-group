import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionInputChipSelectorComponent } from './question-input-chip-selector.component';

describe('QuestionInputChipSelectorComponent', () => {
  let component: QuestionInputChipSelectorComponent;
  let fixture: ComponentFixture<QuestionInputChipSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionInputChipSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionInputChipSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
