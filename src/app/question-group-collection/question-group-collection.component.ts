import {
  AfterViewInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {QuestionGroupComponent} from '../question-group/question-group.component';
import {KeyValue} from '@angular/common';

@Component({
  selector: 'app-question-group-collection',
  standalone: true,
  imports: [],
  templateUrl: './question-group-collection.component.html',
  styleUrl: './question-group-collection.component.scss'
})
export class QuestionGroupCollectionComponent<T = string | string[]> implements AfterViewInit {
  @Input({required: true}) name: string = '';
  @Output() onValueChanged = new EventEmitter<Map<string, Map<string, T>>>();

  @ViewChild('questionGroupContainer', {
    read: ViewContainerRef,
    static: false
  }) questionGroupContainer!: ViewContainerRef;
  @ContentChildren(QuestionGroupComponent, {descendants: true}) questionGroups!: QueryList<QuestionGroupComponent<T>>;

  data: Map<string, Map<string, T>> = new Map<string, Map<string, T>>();

  constructor(private viewContainerRef: ViewContainerRef) {
  }

  valueChange(key: string, value: KeyValue<string, T>) {
    console.log(key, value);

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
    this.questionGroupContainer.clear();

    this.questionGroups.forEach((questionGroup, i) => {
      const context = {separator: false};

      if (i + 1 !== this.questionGroups.length) {
        context.separator = true;
      }

      this.questionGroupContainer.createEmbeddedView(questionGroup.template, context);

      console.log(questionGroup.name);

      questionGroup.onValueChanged.subscribe((newValue: KeyValue<string, KeyValue<string, T>>) => {
        console.log(`questionGroupCollection: ${newValue.key} - ${newValue.value.key}`)
        this.valueChange(newValue.key, newValue.value);
      });
    });
  }
}
