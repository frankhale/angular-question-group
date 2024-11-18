import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  Host,
  Input,
  OnInit,
  Optional,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewContainerRef
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
  standalone: true,
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
  @Input({required: true}) name: string = '';
  @Input({required: true}) question: string = '';
  @Input() showQuestionInputOnSelectedValue: YesNoOrEmpty = '';
  @Input() warning: string = '';
  @Input() info: string = '';
  @Input() completed: boolean = false;
  @Input() formGroup!: FormGroup;
  @Output() onQuestionAnswered = new EventEmitter<KeyValue<string, T>>();

  @ViewChild("questionTemplate", {static: true}) template!: TemplateRef<any>;

  @ContentChildren(QuestionDirective, {descendants: true}) questionInputs?: QueryList<QuestionDirective<T>>;

  questionInputTemplates: TemplateRef<any>[] = [];

  selectedOption: string = '';

  ngOnInit() {
    if (!this.formGroup) {
      this.formGroup = new FormGroup({});
    }
  }

  ngAfterContentInit() {
    this.questionInputs?.forEach(questionInput => {
      questionInput.baseComponent.formGroup = this.formGroup;
      this.questionInputTemplates.push(questionInput.baseComponent.template);
      if (!this.formGroup.get(questionInput.baseComponent.name)) {
        this.formGroup.addControl(questionInput.baseComponent.name, new FormControl(''));
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
    this.onQuestionAnswered.emit({key: this.name, value: value});
  }
}
