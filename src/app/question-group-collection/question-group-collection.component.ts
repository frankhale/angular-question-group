import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList, TemplateRef
} from '@angular/core';
import {QuestionGroupComponent} from '../question-group/question-group.component';
import {KeyValue, NgForOf, NgTemplateOutlet} from '@angular/common';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
    selector: 'app-question-group-collection',
    imports: [
        ReactiveFormsModule,
        NgForOf,
        NgTemplateOutlet
    ],
    templateUrl: './question-group-collection.component.html',
    styleUrl: './question-group-collection.component.scss'
})
export class QuestionGroupCollectionComponent<T = string | string[]> implements AfterViewInit, AfterContentInit {
  @Input({required: true}) name: string = '';
  @Input() formGroup!: FormGroup;
  @Output() onValueChanged = new EventEmitter<KeyValue<string, KeyValue<string, T>>>();

  @ContentChildren(QuestionGroupComponent, {descendants: true}) questionGroups!: QueryList<QuestionGroupComponent<T>>;

  questionInputTemplates: TemplateRef<any>[] = [];

  valueChange(kv: KeyValue<string, KeyValue<string, T>>) {
    this.onValueChanged.emit(kv);
  }

  ngAfterContentInit() {
    this.questionGroups.forEach((questionGroup) => {
      questionGroup.formGroup = this.formGroup;
      questionGroup.questions.forEach(question => {
        question.formGroup = this.formGroup;
        question.questionInputs?.forEach(questionInputDirective => {
          this.questionInputTemplates.push(questionInputDirective.baseComponent.template);
          questionInputDirective.baseComponent.formGroup = this.formGroup;
        });
      });
    });
  }

  ngAfterViewInit() {
    this.questionGroups.forEach((questionGroup, i) => {
      questionGroup.onValueChanged.subscribe((newValue: KeyValue<string, KeyValue<string, T>>) => {
        this.valueChange(newValue);
      });
    });
  }
}
