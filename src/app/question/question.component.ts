import {
  AfterContentInit,
  Component,
  Host,
  OnInit,
  Optional,
  TemplateRef,
  ViewContainerRef,
  input, model,
  output,
  viewChild,
  contentChildren
} from '@angular/core';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {FormControl, FormGroup, FormsModule} from '@angular/forms';
import {YesNoOrEmpty} from '../models/yes-no-empty';
import {KeyValue, NgForOf, NgTemplateOutlet} from '@angular/common';
import {QuestionInputComponent} from '../component/question-input-base-component';
import {QuestionDirective} from '../directives/question-directive';
import {QuestionGroupComponent} from '../question-group/question-group.component';

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
    providers: [{ provide: QuestionInputComponent, useExisting: QuestionComponent }],
    templateUrl: './question.component.html',
    styleUrl: './question.component.scss'
})
export class QuestionComponent<T> implements AfterContentInit, OnInit {
  readonly name = input.required<string>();
  readonly question = input.required<string>();
  readonly showQuestionInputOnSelectedValue = input<YesNoOrEmpty>('');
  readonly warning = input<string>('');
  readonly info = input<string>('');
  readonly completed = input<boolean>(false);
  formGroup = model<FormGroup>();
  readonly onQuestionAnswered = output<KeyValue<string, T>>();

  readonly template = viewChild.required<TemplateRef<any>>("questionTemplate");

  readonly questionInputs = contentChildren(QuestionDirective, { descendants: true });

  questionInputTemplates: TemplateRef<any>[] = [];

  selectedOption: string = '';

  ngOnInit() {
    if (!this.formGroup()) {
      this.formGroup.set(new FormGroup({}));
    }
  }

  ngAfterContentInit() {
    this.questionInputs()?.forEach(questionInput => {
      questionInput.baseComponent.formGroup.set(this.formGroup());
      this.questionInputTemplates.push(questionInput.baseComponent.template());
      const name = questionInput.baseComponent.name();
      const formGroup = this.formGroup();
      if (!formGroup?.get(name)) {
        formGroup?.addControl(name, new FormControl(''));
      }

      // NOTE: Need to create onValueChanged so that a single question can provide info
      // about the values that were entered into the form.

      // if (questionInput && questionInput.baseComponent.onValueChanged) {
      //   questionInput.baseComponent.onValueChanged.subscribe((newValue: T) => {
      //     //this.valueChange(questionInput!.name, newValue);
      //     console.log(questionInput!.baseComponent.name, newValue);
      //   });
      // }
    });
  }

  onSelectedOption(value: T): void {
    this.onQuestionAnswered.emit({key: this.name(), value: value});
  }
}
