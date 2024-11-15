import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {QuestionComponent} from '../question/question.component';
import {KeyValue} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

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
  @Input() formGroup!: FormGroup;
  @Output() onValueChanged = new EventEmitter<KeyValue<string, KeyValue<string, T>>>();

  @ViewChild('tempQuestionContainer', {read: ViewContainerRef}) tempQuestionContainer!: ViewContainerRef;
  @ViewChild("questionGroupTemplate", {static: true}) template!: TemplateRef<any>;
  @ViewChild('questionContainer', {read: ViewContainerRef}) questionContainer!: ViewContainerRef;

  @ContentChildren(QuestionComponent, {descendants: true}) questions!: QueryList<QuestionComponent<T>>;

  constructor(private viewContainerRef: ViewContainerRef) {
  }

  valueChange(key: string, value: T) {
    this.onValueChanged.emit({key: this.name, value: {key, value}});
  }

  async ngAfterViewInit() {
    if (!this.formGroup) {
      this.formGroup = new FormGroup({});
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

    await this.renderViews();

    if (this.questionContainer) {
      const viewCount = this.tempQuestionContainer.length;
      for (let i = 0; i < viewCount; i++) {
        const view = this.tempQuestionContainer.detach(0);
        if (view) {
          this.questionContainer.insert(view);
        }
      }
    }
  }

  private async renderViews() {
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
  }
}
