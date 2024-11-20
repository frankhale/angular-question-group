import {
  AfterContentInit,
  AfterViewInit,
  Component,
  Host,
  Optional,
  TemplateRef,
  input, model,
  output,
  viewChild,
  contentChildren
} from '@angular/core';
import {QuestionComponent} from '../question/question.component';
import {KeyValue, NgForOf, NgTemplateOutlet} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {QuestionGroupCollectionComponent} from '../question-group-collection/question-group-collection.component';

@Component({
    selector: 'app-question-group',
    imports: [
        ReactiveFormsModule,
        NgTemplateOutlet,
        NgForOf
    ],
    templateUrl: './question-group.component.html',
    styleUrl: './question-group.component.scss'
})
export class QuestionGroupComponent<T> implements AfterContentInit, AfterViewInit {
  readonly name = input.required<string>();
  formGroup = model<FormGroup>();
  readonly onValueChanged = output<KeyValue<string, KeyValue<string, T>>>();

  readonly template = viewChild.required<TemplateRef<any>>("questionGroupTemplate");

  readonly questions = contentChildren(QuestionComponent, { descendants: true });
  questionGroupCollectionIsParent: boolean;

  constructor(@Optional() @Host() private parent: QuestionGroupCollectionComponent) {
    this.questionGroupCollectionIsParent = !!parent;
  }

  valueChange(key: string, value: T) {
    this.onValueChanged.emit({key: this.name(), value: {key, value}});
  }

  ngAfterContentInit() {
    if (!this.formGroup()) {
      this.formGroup.set(new FormGroup({}));
    }

    this.questions()!.forEach(question => {
      question.formGroup.set(this.formGroup());
      question.questionInputs()?.forEach(questionInput => {
        questionInput.baseComponent.formGroup.set(this.formGroup());
        const name = questionInput.baseComponent.name();
        const formGroup = this.formGroup();
        if (!formGroup?.get(name)) {
          formGroup?.addControl(name, new FormControl(''));
        }
      });
    });
  }

  ngAfterViewInit() {
    this.questions().forEach(question => {
      question.onQuestionAnswered.subscribe((answer: KeyValue<string, T>) => {
        this.valueChange(answer.key, answer.value);
      });

      question.questionInputs()?.forEach(questionInputDirective => {
        const questionInput = questionInputDirective.baseComponent;

        if (questionInput && questionInput.onValueChanged) {
          questionInput.onValueChanged.subscribe((newValue: T) => {
            this.valueChange(questionInput!.name(), newValue);
          });
        }
      });
    });
  }
}
