import {
  AfterViewInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList, TemplateRef,
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
export class QuestionGroupCollectionComponent<T = string | string[]> implements AfterViewInit {
  @Input({required: true}) name: string = '';
  @Output() onValueChanged = new EventEmitter<Map<string, Map<string, T>>>();

  @ViewChild('tempQuestionGroupContainer', {read: ViewContainerRef}) tempQuestionGroupContainer!: ViewContainerRef;
  @ViewChild("formTemplate", {static: true}) template!: TemplateRef<any>;
  @ViewChild('questionGroupContainer', {read: ViewContainerRef}) questionGroupContainer!: ViewContainerRef;

  @ContentChildren(QuestionGroupComponent, {descendants: true}) questionGroups!: QueryList<QuestionGroupComponent<T>>;

  data: Map<string, Map<string, T>> = new Map<string, Map<string, T>>();

  constructor(private viewContainerRef: ViewContainerRef) {
  }

  valueChange(key: string, value: KeyValue<string, T>) {
    if (value.value !== '') {
      if (!this.data.has(key)) {
        this.data.set(key, new Map<string, T>());
      }
      this.data.get(key)?.set(value.key, value.value);
    } else {
      this.data.delete(key);
    }

    this.onValueChanged.emit(this.data);
  }

  ngAfterViewInit(): void {
    this.tempQuestionGroupContainer.clear();

    this.questionGroups.forEach((questionGroup, i) => {
      const context = {
        separator: false
      };

      if (i + 1 !== this.questionGroups.length) {
        context.separator = true;
      }

      this.tempQuestionGroupContainer.createEmbeddedView(questionGroup.template, context);

      setTimeout(() => {
        if (this.questionGroupContainer) {
            const view = this.tempQuestionGroupContainer.detach(0);
            if (view) {
              this.questionGroupContainer.insert(view);
            }
          }
      });

      questionGroup.onValueChanged.subscribe((newValue: KeyValue<string, KeyValue<string, T>>) => {
        this.valueChange(newValue.key, newValue.value);
      });
    });
  }

  onSubmit() {
    console.log("Submitting form...");
  }
}
