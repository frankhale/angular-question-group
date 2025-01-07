import {ComponentFixture, TestBed} from '@angular/core/testing';

import {QuestionGroupCollectionComponent} from './question-group-collection.component';

describe('QuestionGroupCollectionComponent', () => {
  let component: QuestionGroupCollectionComponent<string>;
  let fixture: ComponentFixture<QuestionGroupCollectionComponent<string>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionGroupCollectionComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(QuestionGroupCollectionComponent<string>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
