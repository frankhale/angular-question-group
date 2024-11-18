import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  EventEmitter,
  Host,
  Input,
  Optional,
  Output,
  QueryList,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {QuestionComponent} from '../question/question.component';
import {KeyValue, NgForOf, NgTemplateOutlet} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {QuestionGroupCollectionComponent} from '../question-group-collection/question-group-collection.component';

@Component({
  selector: 'app-question-group',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgTemplateOutlet,
    NgForOf
  ],
  templateUrl: './question-group.component.html',
  styleUrl: './question-group.component.scss'
})
export class QuestionGroupComponent<T> implements AfterContentInit, AfterViewInit {
  @Input({required: true}) name: string = '';
  @Input() formGroup!: FormGroup;
  @Output() onValueChanged = new EventEmitter<KeyValue<string, KeyValue<string, T>>>();

  @ViewChild("questionGroupTemplate", {static: true}) template!: TemplateRef<any>;

  @ContentChildren(QuestionComponent, {descendants: true}) questions!: QueryList<QuestionComponent<T>>;
  questionGroupCollectionIsParent: boolean;

  constructor(@Optional() @Host() private parent: QuestionGroupCollectionComponent) {
    this.questionGroupCollectionIsParent = !!parent;
  }

  valueChange(key: string, value: T) {
    this.onValueChanged.emit({key: this.name, value: {key, value}});
  }

  ngAfterContentInit() {
    if (!this.formGroup) {
      this.formGroup = new FormGroup({});
    }

    this.questions!.forEach(question => {
      question.formGroup = this.formGroup;
      question.questionInputs?.forEach(questionInput => {
        questionInput.baseComponent.formGroup = this.formGroup;

        if (!this.formGroup.get(questionInput.baseComponent.name)) {
          this.formGroup.addControl(questionInput.baseComponent.name, new FormControl(''));
        }
      });
    });
  }

  ngAfterViewInit() {
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
  }
}
