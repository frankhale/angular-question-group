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
  ViewContainerRef,
} from '@angular/core';
import {QuestionComponent} from '../question/question.component';
import {KeyValue, NgTemplateOutlet} from '@angular/common';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-question-group',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgTemplateOutlet
  ],
  templateUrl: './question-group.component.html',
  styleUrl: './question-group.component.scss'
})
export class QuestionGroupComponent<T> implements AfterViewInit {
  @Input({required: true}) name: string = '';
  @Output() onValueChanged = new EventEmitter<KeyValue<string, KeyValue<string, T>>>();

  @ContentChildren(QuestionComponent, {descendants: true}) questions!: QueryList<QuestionComponent<T>>;
  @ViewChild(TemplateRef, {static: true}) template!: TemplateRef<any>;
  @ViewChild('questionContainer', {read: ViewContainerRef, static: true}) questionContainer!: ViewContainerRef;

  formGroup: FormGroup = new FormGroup({});

  constructor(private viewContainerRef: ViewContainerRef) {
  }

  valueChange(key: string, value: T) {
    this.onValueChanged.emit({key: this.name, value: {key, value}});
  }

  ngAfterViewInit(): void {
    this.viewContainerRef.clear();

    this.questions.forEach(question => {
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

    this.viewContainerRef.createEmbeddedView(this.template);
  }

  onSubmit() {
    console.log("Submitting form...");
  }
}
