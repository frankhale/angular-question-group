import {
  AfterContentInit,
  Component,
  contentChildren,
  input,
  model,
  OnInit,
  output,
  TemplateRef,
  viewChild
} from '@angular/core';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {FormControl, FormGroup, FormsModule} from '@angular/forms';
import {YesNoOrEmpty} from '../models/yes-no-empty';
import {KeyValue, NgForOf, NgTemplateOutlet} from '@angular/common';
import {QuestionInputComponent} from '../component/question-input-base-component';
import {QuestionDirective} from '../directives/question-directive';
import {QuestionTemplateComponent} from '../question-template/question-template.component';
import {Message} from '../models/message';

@Component({
  selector: 'app-question',
  imports: [
    MatGridTile,
    MatGridList,
    MatRadioGroup,
    MatRadioButton,
    FormsModule,
    NgTemplateOutlet,
    NgForOf
  ],
  providers: [{provide: QuestionInputComponent, useExisting: QuestionComponent}],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss'
})
export class QuestionComponent<T> implements AfterContentInit, OnInit {
  readonly name = input.required<string>();
  readonly question = input.required<string>();
  readonly showQuestionInputOnSelectedValue = input<YesNoOrEmpty>('');
  readonly messages = input<Message[]>();
  readonly completed = input<boolean>(false);
  readonly onQuestionAnswered = output<KeyValue<string, T>>();
  readonly formGroup = model<FormGroup>();
  readonly template = viewChild.required<TemplateRef<any>>("questionTemplate");
  readonly questionInputs = contentChildren(QuestionDirective);
  readonly questionTemplateComponents = contentChildren(QuestionTemplateComponent, {descendants: true});

  selectedOption: string = '';

  ngOnInit() {
    if (!this.formGroup()) {
      this.formGroup.set(new FormGroup({}));
    }

    this.onQuestionAnswered.subscribe((answer: KeyValue<string, T>) => {
      if (answer.value === 'no') {
        this.questionInputs()?.forEach(questionInput => {
          questionInput.baseComponent.formGroup()?.get(questionInput.baseComponent.name())?.setValue('');
        });
      }
    });
  }

  ngAfterContentInit() {
    this.questionInputs()?.forEach(questionInput => {
      if (!questionInput.baseComponent.formGroup()) {
        questionInput.baseComponent.formGroup.set(this.formGroup());
      }

      if (!this.formGroup()?.get(questionInput.baseComponent.name())) {
        this.formGroup()?.addControl(questionInput.baseComponent.name(), new FormControl(''));
      }

      // MAYBE?!?: Create onValueChanged so that a single question can provide info
      // about the values that were entered into the form.

      // if (questionInput && questionInput.baseComponent.onValueChanged) {
      //   questionInput.baseComponent.onValueChanged.subscribe((newValue: T) => {
      //     //this.valueChange(questionInput!.name, newValue);
      //     console.log(questionInput!.baseComponent.name, newValue);
      //   });
      // }
    });

    this.questionTemplateComponents()?.forEach(questionTemplateComponent => {
      if (questionTemplateComponent.questions()) {
        questionTemplateComponent.questions().forEach(question => {
          if (!question.formGroup()) {
            question.formGroup.set(this.formGroup());
          }

          question.questionInputs()?.forEach(questionInputDirective => {
            questionInputDirective.baseComponent.formGroup.set(this.formGroup());
          });
        });
      }
    });
  }

  onSelectedOption(value: T): void {
    this.onQuestionAnswered.emit({key: this.name(), value: value});
  }
}
