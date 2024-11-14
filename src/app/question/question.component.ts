import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {FormGroup, FormsModule} from '@angular/forms';
import {YesNoOrEmpty} from '../models/yes-no-empty';
import {KeyValue} from '@angular/common';
import {QuestionInputComponent} from '../component/base-component';
import {QuestionDirective} from '../directives/question-directive';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [
    MatGridTile,
    MatGridList,
    MatRadioGroup,
    MatRadioButton,
    FormsModule
  ],
  providers: [{provide: QuestionInputComponent, useExisting: QuestionComponent}],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss'
})
export class QuestionComponent<T> implements AfterViewInit, OnInit {
  @Input({required: true}) name: string = '';
  @Input({required: true}) question: string = '';
  @Input() showQuestionInputOnSelectedValue: YesNoOrEmpty = '';
  @Input() warning: string = '';
  @Input() info: string = '';
  @Input() completed: boolean = false;
  @Input() formGroup!: FormGroup;
  @Output() onQuestionAnswered = new EventEmitter<KeyValue<string, T>>();

  @ViewChild("questionTemplate", {static: true}) template!: TemplateRef<any>;
  @ViewChild('tempQuestionInputContainer', {read: ViewContainerRef}) tempQuestionInputContainer!: ViewContainerRef;
  @ViewChild('questionInputContainer', {read: ViewContainerRef}) questionInputContainer!: ViewContainerRef;

  @ContentChildren(QuestionDirective, {descendants: true}) questionInputs?: QueryList<QuestionDirective<T>>;

  selectedOption: string = '';

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // this.viewContainerRef.clear();
    // this.viewContainerRef.createEmbeddedView(this.template);
  }

  onSelectedOption(value: T): void {
    this.questionInputContainer.clear();

    if (value === this.showQuestionInputOnSelectedValue) {
      this.questionInputs?.forEach(questionInput => {
        this.tempQuestionInputContainer.createEmbeddedView(questionInput.baseComponent.template);
      });

      const viewCount = this.tempQuestionInputContainer.length;
      for (let i = 0; i < viewCount; i++) {
        const view = this.tempQuestionInputContainer.detach(0);
        if (view) {
          this.questionInputContainer.insert(view);
        }
      }
    }

    this.onQuestionAnswered.emit({key: this.name, value: value});
  }
}
