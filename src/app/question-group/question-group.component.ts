import {
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {QuestionComponent} from '../question/question.component';
import {KeyValue} from '@angular/common';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-question-group',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './question-group.component.html',
  styleUrl: './question-group.component.scss'
})
export class QuestionGroupComponent<T> implements AfterViewInit {
  @Input({required: true}) name: string = '';
  @Output() onValueChanged = new EventEmitter<KeyValue<string, KeyValue<string, T>>>();

  @ViewChild("questionGroupTemplate", {static: true}) template!: TemplateRef<any>;
  @ViewChild('tempQuestionContainer', {read: ViewContainerRef}) tempQuestionContainer!: ViewContainerRef;
  @ViewChild('questionContainer', {read: ViewContainerRef}) questionContainer!: ViewContainerRef;

  @ContentChildren(QuestionComponent, {descendants: true}) questions!: QueryList<QuestionComponent<T>>;

  constructor(private viewContainerRef: ViewContainerRef,
              private cdr: ChangeDetectorRef) {
  }

  valueChange(key: string, value: T) {
    this.onValueChanged.emit({key: this.name, value: {key, value}});
  }

  ngAfterViewInit() {
    this.tempQuestionContainer.clear();

    this.questions.forEach(question => {
      this.tempQuestionContainer.createEmbeddedView(question.template);

      question.onQuestionAnswered.subscribe((answer: KeyValue<string, T>) => {
        this.valueChange(answer.key, answer.value);
      });

      question.questionInputs?.forEach(questionInputDirective => {
        const questionInput = questionInputDirective.baseComponent;
        if (questionInput && questionInput.onValueChanged) {
          questionInput.onValueChanged.subscribe((newValue: T) => {
            this.valueChange(questionInput!.name, newValue);
          });
        }
      });
    });

    setTimeout(() => {
      if (this.questionContainer) {
        const viewCount = this.tempQuestionContainer.length;
        for (let i = 0; i < viewCount; i++) {
          const view = this.tempQuestionContainer.detach(0);
          if (view) {
            this.questionContainer.insert(view);
          }
        }
      }
    });
  }

}
