import {
  AfterContentInit, ChangeDetectorRef,
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
  imports: [MatGridTile, MatGridList, MatRadioGroup, MatRadioButton, FormsModule, NgTemplateOutlet, NgForOf],
  providers: [{provide: QuestionInputComponent, useExisting: QuestionComponent}],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss'
})
export class QuestionComponent<T> implements AfterContentInit, OnInit {
  readonly name = input.required<string>();
  readonly title = input<string>();
  readonly question = input.required<string>();
  readonly messages = input<Message[]>();
  readonly completed = input<boolean>(false);
  readonly formGroup = model<FormGroup>();
  readonly template = viewChild.required<TemplateRef<any>>("questionTemplate");
  readonly questionInputs = contentChildren(QuestionDirective);
  readonly questionTemplateComponents = contentChildren(QuestionTemplateComponent, {descendants: true});
  readonly initialValue = input<YesNoOrEmpty>();
  readonly onQuestionAnswered = output<KeyValue<string, T>>();
  //readonly onNumberOfChildrenUpdated = output<number>();

  //private numberOfChildren: number = 0;
  selectedOption: string = '';

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    if (!this.formGroup()) {
      this.formGroup.set(new FormGroup({}));
    }
  }

  ngAfterContentInit() {
    const iv = this.initialValue();
    if (iv) {
      this.selectedOption = iv;
      this.onSelectedOption(this.selectedOption as T);
    }

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
      //     console.log(questionInput!.baseComponent.name(), newValue);
      //   });
      // }
    });

    this.questionTemplateComponents()?.forEach(questionTemplateComponent => {
      if (questionTemplateComponent.questions()) {
        questionTemplateComponent.questions().forEach(question => {
          if (!question.formGroup()) {
            question.formGroup.set(this.formGroup());
          }

          question.onQuestionAnswered.subscribe((answer: KeyValue<string, T>) => {
            this.onQuestionAnswered.emit(answer);
          });

          question.questionInputs()?.forEach(questionInputDirective => {
            if (!questionInputDirective.baseComponent.formGroup()) {
              questionInputDirective.baseComponent.formGroup.set(this.formGroup());
            }

            if (!this.formGroup()?.get(questionInputDirective.baseComponent.name())) {
              this.formGroup()?.addControl(questionInputDirective.baseComponent.name(), new FormControl(''));
            }
          });
        });
      }
    });
  }

  onSelectedOption(value: T): void {
    this.questionInputs()?.forEach(questionInput => {
      const formGroup = questionInput.baseComponent.formGroup();
      const control = formGroup?.get(questionInput.baseComponent.name());

      const showOnAnswer = questionInput.baseComponent.showOnAnswer();
      const controlValue = control?.value;
      const valueMismatch = value !== showOnAnswer;

      if (controlValue === 'DELETE_ME') {
        // If the control's value is already 'DELETE_ME', reset it to an empty string
        control?.setValue('');
        questionInput.baseComponent.toggleValidators(true);
      } else if (valueMismatch) {
        if (showOnAnswer !== '') {
          // Set value to 'DELETE_ME' if conditions are met
          control?.setValue('DELETE_ME');
          questionInput.baseComponent.toggleValidators(false);
        } else {
          control?.setValue('');
          questionInput.baseComponent.toggleValidators(true);
        }
      }
    });

    this.questionTemplateComponents()?.forEach(questionTemplateComponent => {
      if (questionTemplateComponent.showOnAnswer() !== this.selectedOption) return;

      if (questionTemplateComponent.questions()) {
        questionTemplateComponent.questions().forEach(question => {
          if (question.selectedOption === "DELETE_ME") {
            this.selectedOption = '';
          } else {
            question.onSelectedOption("DELETE_ME");
          }
        });
      }
    });

    this.onQuestionAnswered.emit({key: this.name(), value: value});
  }
}
