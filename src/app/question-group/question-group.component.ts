import {
  AfterContentInit,
  Component,
  ContentChildren, EventEmitter, Input, Output,
  QueryList,
} from '@angular/core';
import {QuestionComponent} from '../question/question.component';
import {KeyValue} from '@angular/common';

@Component({
  selector: 'app-question-group',
  standalone: true,
  imports: [],
  templateUrl: './question-group.component.html',
  styleUrl: './question-group.component.scss'
})
export class QuestionGroupComponent implements AfterContentInit {
  @Input({ required: true }) name: string = '';
  @Output() onValueChanged = new EventEmitter<KeyValue<string, KeyValue<string, string>>>();
  @ContentChildren(QuestionComponent, { descendants: true }) questions!: QueryList<QuestionComponent>;

  valueChange(key: string, value: string) {
    this.onValueChanged.emit({ key: this.name, value: { key, value } });
  }

  ngAfterContentInit(): void {
    this.questions.forEach(question => {
      question.onQuestionAnswered.subscribe((answer: KeyValue<string, string>) => {
        this.valueChange(answer.key, answer.value);
      })

      question.questionInputs?.forEach(questionInputDirective => {
        const questionInput = questionInputDirective.baseComponent;
        if (questionInput && questionInput.onValueChanged) {
          questionInput.onValueChanged.subscribe((newValue: string) => {
            this.valueChange(questionInput!.name, newValue);
          });
        }
      });
    });
  }
}
