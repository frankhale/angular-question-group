import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionInputInformationPanelComponent } from './question-input-information-panel.component';

describe('QuestionInputInformationPanelComponent', () => {
  let component: QuestionInputInformationPanelComponent;
  let fixture: ComponentFixture<QuestionInputInformationPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionInputInformationPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionInputInformationPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
