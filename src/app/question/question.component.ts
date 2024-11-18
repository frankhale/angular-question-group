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
  @ViewChild('questionInputContainer', {read: ViewContainerRef}) questionInputContainer!: ViewContainerRef;

  @ContentChildren(QuestionDirective, {descendants: true}) questionInputs?: QueryList<QuestionDirective<T>>;

  selectedOption: string = '';
  questionGroupIsParent: boolean;

  constructor(@Optional() @Host() private parent: QuestionGroupComponent<T>) {
    this.questionGroupIsParent = !!parent;
  }

  ngOnInit() {
    if (!this.formGroup) {
      this.formGroup = new FormGroup({});
    }
  }

  ngAfterContentInit() {
    this.questionInputs?.forEach(questionInput => {
      questionInput.baseComponent.formGroup = this.formGroup;
      if (!this.formGroup.get(questionInput.baseComponent.name)) {
        this.formGroup.addControl(questionInput.baseComponent.name, new FormControl(''));
      }
    });
  }

  onSelectedOption(value: T): void {
    this.questionInputContainer.clear();

    if (value === this.showQuestionInputOnSelectedValue) {
      this.questionInputs?.forEach(questionInput => {
        this.questionInputContainer.createEmbeddedView(questionInput.baseComponent.template);
      });
    }

    this.onQuestionAnswered.emit({key: this.name, value: value});
  }
}
