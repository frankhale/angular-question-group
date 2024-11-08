import {
  AfterViewInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {FormsModule} from '@angular/forms';
import {YesNoOrEmpty} from '../models/yes-no-empty';
import {KeyValue, NgTemplateOutlet} from '@angular/common';
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
    FormsModule,
    NgTemplateOutlet
  ],
  providers: [{provide: QuestionInputComponent, useExisting: QuestionComponent}],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss',
})
export class QuestionComponent<T> implements AfterViewInit {
  @Input({required: true}) name: string = '';
  @Input({required: true}) question: string = '';
  @Input() showQuestionInputOnSelectedValue: YesNoOrEmpty = '';
  @Input() warning: string = '';
  @Input() info: string = '';
  @Input() completed: boolean = false;
  @Output() onQuestionAnswered = new EventEmitter<KeyValue<string, T>>();

  @ViewChild(TemplateRef, {static: true}) template!: TemplateRef<any>;
  @ViewChild('questionInputContainer', {read: ViewContainerRef}) questionInputContainer!: ViewContainerRef;

  @ContentChildren(QuestionDirective, {descendants: true}) questionInputs?: QueryList<QuestionDirective<T>>;

  selectedOption: string = '';

  constructor(private viewContainerRef: ViewContainerRef) {
  }

  ngAfterViewInit(): void {
    this.viewContainerRef.createEmbeddedView(this.template);
  }

  onSelectedOption(value: T): void {
    //console.log('Selected option:', value);
    this.questionInputContainer.clear();

    if (value === this.showQuestionInputOnSelectedValue) {
      //console.log(this.questionInputContainer);
      this.questionInputs?.forEach(questionInput => {
        //console.log('questionInput', questionInput);
        this.questionInputContainer.createEmbeddedView(questionInput.baseComponent.template!);
      });
    }

    this.onQuestionAnswered.emit({key: this.name, value: value});
  }
}
