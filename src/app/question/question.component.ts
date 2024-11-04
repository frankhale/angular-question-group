import {
  AfterContentInit,
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
import {QuestionDirective, QuestionInputComponent, YesNoOrEmpty} from '../models/question';
import {KeyValue, NgTemplateOutlet} from '@angular/common';

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
  providers: [{ provide: QuestionInputComponent, useExisting: QuestionComponent }],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss',
})
export class QuestionComponent implements AfterContentInit {
  @Input({ required: true }) question: string = '';
  @Input({ required: true }) showQuestionInputOnSelectedValue: YesNoOrEmpty = '';
  @Input() warning: string = '';
  @Input() info: string = '';

  @Output() onQuestionAnswered = new EventEmitter<KeyValue<string, string>>();
  @ContentChildren(QuestionDirective, { descendants: true }) questionInputs?: QueryList<QuestionDirective>;

  selectedOption: string = '';

  ngAfterContentInit(): void {
    console.log(`QuestionComponent: ngAfterContentInit() -> ${this.questionInputs?.length}`)
    console.log(this.questionInputs);
  }

  onSelectedOption(value: string): void {
    //console.log('Selected option:', value);
    this.onQuestionAnswered.emit({ key: this.question, value: value });
  }
}
