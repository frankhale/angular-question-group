import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionInputControlPanelComponent } from './question-input-control-panel.component';

describe('QuestionInputControlPanelComponent', () => {
  let component: QuestionInputControlPanelComponent;
  let fixture: ComponentFixture<QuestionInputControlPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionInputControlPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionInputControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
