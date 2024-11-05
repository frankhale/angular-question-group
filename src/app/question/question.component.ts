import {
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList
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
export class QuestionComponent<T> {
  @Input({required: true}) name: string = '';
  @Input({required: true}) question: string = '';
  @Input() showQuestionInputOnSelectedValue: YesNoOrEmpty = '';
  @Input() warning: string = '';
  @Input() info: string = '';
  @Input() completed: boolean = false;

  @Output() onQuestionAnswered = new EventEmitter<KeyValue<string, string>>();
  @ContentChildren(QuestionDirective, {descendants: true}) questionInputs?: QueryList<QuestionDirective<T>>;

  selectedOption: string = '';

  onSelectedOption(value: string): void {
    //console.log('Selected option:', value);
    this.onQuestionAnswered.emit({key: this.name, value: value});
  }
}
