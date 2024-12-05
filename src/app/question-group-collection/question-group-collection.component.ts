import {
  AfterContentInit,
  AfterViewInit,
  Component,
  contentChildren,
  input,
  model,
  output,
  TemplateRef
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
  readonly name = input.required<string>();
  readonly formGroup = model<FormGroup>();
  readonly onValueChanged = output<KeyValue<string, KeyValue<string, T>>>();
  readonly questionGroups = contentChildren(QuestionGroupComponent, {descendants: true});

  questionInputTemplates: TemplateRef<any>[] = [];

  valueChange(kv: KeyValue<string, KeyValue<string, T>>) {
    this.onValueChanged.emit(kv);
  }

  ngAfterContentInit() {
    this.questionGroups().forEach((questionGroup) => {
      questionGroup.formGroup.set(this.formGroup());
      questionGroup.questions().forEach(question => {
        question.formGroup.set(this.formGroup());
        question.questionInputs()?.forEach(questionInputDirective => {
          this.questionInputTemplates.push(questionInputDirective.baseComponent.template());
          questionInputDirective.baseComponent.formGroup.set(this.formGroup());
        });

      });
    });
  }

  ngAfterViewInit() {
    this.questionGroups().forEach((questionGroup, i) => {
      questionGroup.onValueChanged.subscribe((newValue: KeyValue<string, KeyValue<string, T>>) => {
        this.valueChange(newValue);
      });
    });
  }
}
