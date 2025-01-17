import {
  AfterContentInit,
  Component,
  contentChildren,
  input,
  model,
  OnInit,
  output,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { FormGroup, FormsModule } from '@angular/forms';
import { YesNoOrEmpty } from '../models/yes-no-empty';
import { KeyValue, NgForOf, NgTemplateOutlet } from '@angular/common';
import { QuestionInputComponent } from '../component/question-input-base-component';
import { QuestionDirective } from '../directives/question-directive';
import { QuestionTemplateComponent } from '../question-template/question-template.component';
import { Message } from '../models/message';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-question',
  imports: [
    MatGridTile,
    MatGridList,
    MatRadioGroup,
    MatRadioButton,
    FormsModule,
    NgTemplateOutlet,
    NgForOf,
    MatButton,
  ],
  providers: [
    { provide: QuestionInputComponent, useExisting: QuestionComponent },
  ],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss',
})
export class QuestionComponent<T> implements AfterContentInit, OnInit {
  readonly name = input.required<string>();
  readonly title = input<string>();
  readonly question = input.required<string>();
  readonly messages = input<Message[]>();
  readonly completed = model<boolean>(false);
  readonly formGroup = model<FormGroup>();
  readonly template = viewChild.required<TemplateRef<any>>('questionTemplate');
  readonly questionInputs = contentChildren(QuestionDirective);
  readonly questionTemplateComponents = contentChildren(
    QuestionTemplateComponent,
    { descendants: true }
  );
  readonly initialValue = input<YesNoOrEmpty>();
  readonly showMarkComplete = input<boolean>(true);
  readonly onMarkComplete =
    output<KeyValue<string, KeyValue<string, any>[]>[]>();
  readonly onQuestionAnswered = output<KeyValue<string, T>>();
  readonly onChildCountChanged = output<KeyValue<string, number>>();

  selectedOption: string = '';

  // TODO: When questions are in a question-group the question-group takes care of
  // subscribing to the mark complete event and the question answer event. We should
  // add support to detect if the questions parent is a question-group and if it's not
  // then we do the same deal as question-group for any question-templates this question
  // may have so that when the mark complete is clicked the question rolls up all of its
  // answers and inputs in one nice event handler.

  ngOnInit() {
    // if (!this.formGroup()) {
    //   console.log('Setting question formGroup for', this.name());
    //   this.formGroup.set(new FormGroup({}));
    // }
  }

  ngAfterContentInit() {
    const iv = this.initialValue();
    if (iv) {
      this.selectedOption = iv;
      this.onSelectedOption(this.selectedOption as T);
    }

    this.questionTemplateComponents()?.forEach((questionTemplateComponent) => {
      if (questionTemplateComponent.questions()) {
        questionTemplateComponent.questions().forEach((question) => {
          if (!question.formGroup()) {
            question.formGroup.set(this.formGroup());
          }

          question.onQuestionAnswered.subscribe(
            (answer: KeyValue<string, T>) => {
              this.onQuestionAnswered.emit(answer);
            }
          );

          question.onChildCountChanged.subscribe(
            (answer: KeyValue<string, number>) => {
              this.onChildCountChanged.emit(answer);
            }
          );

          question.onMarkComplete.subscribe(
            (answer: KeyValue<string, KeyValue<string, any>[]>[]) => {
              this.onMarkComplete.emit(answer);
            }
          );

          question
            .questionInputs()
            ?.forEach((questionInputDirective: QuestionDirective<T>) => {
              if (!questionInputDirective.baseComponent.formGroup()) {
                questionInputDirective.baseComponent.formGroup.set(
                  this.formGroup()
                );
              }
            });
        });
      }
    });
  }

  getComplete() {
    let finalValues: KeyValue<string, KeyValue<string, any>[]>[] = [];
    let formValues: KeyValue<string, any>[] = [];

    this.questionInputs()?.forEach((questionInput) => {
      const control = this.formGroup()?.get(questionInput.baseComponent.name());

      if (control) {
        formValues.push({
          key: questionInput.baseComponent.name(),
          value: control.value,
        });
      } else {
        formValues.push(questionInput.baseComponent.value);
      }
    });

    finalValues.push({
      key: this.name(),
      value: [
        { key: 'completed', value: this.completed() },
        { key: 'answer', value: this.selectedOption },
        { key: 'inputs', value: formValues },
      ],
    });

    this.questionTemplateComponents()?.forEach((questionTemplateComponent) => {
      questionTemplateComponent.questions().forEach((question) => {
        finalValues = finalValues.concat(question.getComplete());
      });
    });

    return finalValues;
  }

  onComplete() {
    // TODO: May need to disable validators if question had inputs that were not filled out
    // but mark complete was clicked.
    this.completed.set(!this.completed());

    this.onMarkComplete.emit(this.getComplete());
  }

  onSelectedOption(value: T): void {
    this.selectedOption = value as string;

    this.questionTemplateComponents()?.forEach((questionTemplateComponent) => {
      if (questionTemplateComponent.showOnAnswer() !== this.selectedOption) {
        return;
      }
    });

    this.onQuestionAnswered.emit({ key: this.name(), value: value });

    if (
      this.selectedOption === 'yes' ||
      this.selectedOption === 'no' ||
      this.selectedOption === ''
    ) {
      this.onChildCountChanged.emit({
        key: this.name(),
        value: this.getChildCount(this.name(), this.selectedOption),
      });
    }
  }

  getChildCount(name: string, value: string) {
    //console.log(`question -> (${name}) === ${this.name()} and selectedOption === ${value}`);
    const childQuestionInputs = this.questionInputs()?.filter(
      (questionInput) =>
        questionInput.baseComponent.showOnAnswer() === '' ||
        questionInput.baseComponent.showOnAnswer() === value ||
        (questionInput.baseComponent.showOnAnswer() === 'yes_or_no' &&
          value !== '')
    ).length;
    //console.log(`question Input Total = ${this.questionInputs()?.length}`);
    //console.log(`question (${name}) -> Child QuestionInputs count: ${childQuestionInputs}`);
    const childQuestionTemplates = this.questionTemplateComponents()?.filter(
      (questionTemplate) =>
        questionTemplate.showOnAnswer() === '' ||
        questionTemplate.showOnAnswer() === value ||
        (questionTemplate.showOnAnswer() === 'yes_or_no' && value !== '')
    ).length;
    //console.log(`question (${name}) -> Child QuestionTemplate count: ${childQuestionTemplates}`);
    return Math.max(0, childQuestionInputs + childQuestionTemplates);
  }
}
