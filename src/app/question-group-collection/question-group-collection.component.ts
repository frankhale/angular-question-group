import {
  AfterContentInit,
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
import {QuestionGroupComponent} from '../question-group/question-group.component';
import {KeyValue} from '@angular/common';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-question-group-collection',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './question-group-collection.component.html',
  styleUrl: './question-group-collection.component.scss'
})
export class QuestionGroupCollectionComponent<T = string | string[]> implements AfterViewInit, AfterContentInit {
  @Input({required: true}) name: string = '';
  @Input() formGroup!: FormGroup;
  @Output() onValueChanged = new EventEmitter<KeyValue<string, KeyValue<string, T>>>();

  @ViewChild('tempQuestionGroupContainer', {read: ViewContainerRef}) tempQuestionGroupContainer!: ViewContainerRef;
  @ViewChild("questionGroupTemplate", {static: true}) template!: TemplateRef<any>;
  @ViewChild('questionGroupTemplate', {read: ViewContainerRef}) questionGroupContainer!: ViewContainerRef;

  @ContentChildren(QuestionGroupComponent, {descendants: true}) questionGroups!: QueryList<QuestionGroupComponent<T>>;

  valueChange(kv: KeyValue<string, KeyValue<string, T>>) {
    this.onValueChanged.emit(kv);
  }

  ngAfterContentInit() {
    this.questionGroups.forEach((questionGroup) => {
      questionGroup.formGroup = this.formGroup;
      questionGroup.questions.forEach(question => {
        question.formGroup = this.formGroup;
        question.questionInputs?.forEach(questionInputDirective => {
          questionInputDirective.baseComponent.formGroup = this.formGroup;
        });
      });
    });
  }

  async ngAfterViewInit() {
    this.tempQuestionGroupContainer.clear();

    this.questionGroups.forEach((questionGroup, i) => {
      questionGroup.onValueChanged.subscribe((newValue: KeyValue<string, KeyValue<string, T>>) => {
        this.valueChange(newValue);
      });

      const context = {
        separator: false
      };

      if (i + 1 !== this.questionGroups.length) {
        context.separator = true;
      }

      this.tempQuestionGroupContainer.createEmbeddedView(questionGroup.template, context);
    });

    if (this.questionGroupContainer) {
      const viewCount = this.tempQuestionGroupContainer.length;
      for (let i = 0; i < viewCount; i++) {
        const view = this.tempQuestionGroupContainer.detach(0);
        if (view) {
          this.questionGroupContainer.insert(view);
        }
      }
    }
  }
}
