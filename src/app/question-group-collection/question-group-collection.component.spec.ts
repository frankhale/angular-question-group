import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionGroupCollectionComponent } from './question-group-collection.component';

describe('QuestionGroupCollectionComponent', () => {
  let component: QuestionGroupCollectionComponent;
  let fixture: ComponentFixture<QuestionGroupCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionGroupCollectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionGroupCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
