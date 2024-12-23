import {
  AfterContentInit,
  AfterViewInit,
  Component,
  contentChildren,
  input,
  model,
  output,
  TemplateRef,
  viewChild
} from '@angular/core';
import {QuestionComponent} from '../question/question.component';
import {KeyValue, NgForOf, NgTemplateOutlet} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {QuestionDirective} from '../directives/question-directive';

@Component({
  selector: 'app-question-group',
  imports: [ReactiveFormsModule, NgTemplateOutlet, NgForOf],
  templateUrl: './question-group.component.html',
  styleUrl: './question-group.component.scss'
})
export class QuestionGroupComponent<T> implements AfterContentInit, AfterViewInit {
  readonly name = input.required<string>();
  readonly template = viewChild.required<TemplateRef<any>>("questionGroupTemplate");
  readonly questions = contentChildren(QuestionComponent);
  readonly formGroup = model<FormGroup>();
  readonly onValueChanged = output<KeyValue<string, KeyValue<string, T>>>();

  valueChange(key: string, value: T) {
    this.onValueChanged.emit({key: this.name(), value: {key, value}});
  }

  ngAfterContentInit() {
    if (!this.formGroup()) {
      this.formGroup.set(new FormGroup({}));
    }

    this.questions()!.forEach(question => {
      if (!question.formGroup()) {
        question.formGroup.set(this.formGroup());
      }
      question.questionInputs()?.forEach(questionInput => {
        if (!questionInput.baseComponent.formGroup()) {
          questionInput.baseComponent.formGroup.set(this.formGroup());
        }

        if (!this.formGroup()?.get(questionInput.baseComponent.name())) {
          this.formGroup()?.addControl(questionInput.baseComponent.name(), new FormControl(''));
        }
      });
    });
  }

  ngAfterViewInit() {
    this.questions().forEach(question => {
      question.onQuestionAnswered.subscribe((answer: KeyValue<string, T>) => {
        this.valueChange(answer.key, answer.value);
      });

      question.questionTemplateComponents().forEach(questionTemplateComponent => {
        questionTemplateComponent.questions().forEach(question => {
          question.questionInputs()?.forEach(
            (questionInputDirective: QuestionDirective<T>) => {
              const questionInput = questionInputDirective.baseComponent;

              if (questionInput && questionInput.onValueChanged) {
                questionInput.onValueChanged.subscribe((newValue: T) => {
                  this.valueChange(questionInput!.name(), newValue);
                });
              }
          });
        });
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
