import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList, TemplateRef,
  ViewChild,
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
export class QuestionGroupComponent<T> implements AfterContentInit {
  @Input({required: true}) name: string = '';
  @Output() onValueChanged = new EventEmitter<KeyValue<string, KeyValue<string, T>>>();
  @ContentChildren(QuestionComponent, {descendants: true}) questions!: QueryList<QuestionComponent<T>>;
  @ViewChild('templateRef', { static: true }) template!: TemplateRef<any>;

  valueChange(key: string, value: T) {
    this.onValueChanged.emit({key: this.name, value: {key, value}});
  }

  ngAfterContentInit(): void {
    this.questions.forEach(question => {
      question.onQuestionAnswered.subscribe((answer: KeyValue<string, T>) => {
        this.valueChange(answer.key, answer.value);
      })

      question.questionInputs?.forEach(questionInputDirective => {
        const questionInput = questionInputDirective.baseComponent;
        if (questionInput && questionInput.onValueChanged) {
          questionInput.onValueChanged.subscribe((newValue: T) => {
            this.valueChange(questionInput!.name, newValue);
          });
        }
      });
    });
  }
}
