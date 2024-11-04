import {
  AfterContentInit,
  Component,
  ContentChildren, EventEmitter, Output,
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
  @ContentChildren(QuestionComponent, { descendants: true }) questions!: QueryList<QuestionComponent>;
  @Output() onValueChanged = new EventEmitter<KeyValue<string, string>>();

  valueChange(key: string, value: string) {
    //console.log(`QuestionGroupComponent(${key}): ${value}`);
    this.onValueChanged.emit({ key, value });
  }

  ngAfterContentInit(): void {
    //console.log(this.questions);
    this.questions.forEach(question => {
      question.onQuestionAnswered.subscribe((answer: KeyValue<string, string>) => {
        this.valueChange(answer.key, answer.value);
      })

      //console.log(question.questionInputs?.length);

      question.questionInputs?.forEach(questionInputDirective => {
        const questionInput = questionInputDirective.baseComponent;

        if (questionInput && questionInput.onValueChanged) {
          questionInput.onValueChanged.subscribe((newValue: string) => {
            this.valueChange(questionInput!.title, newValue);
          });
        }
      });
    });
  }
}
