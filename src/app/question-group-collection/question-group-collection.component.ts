import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChild, ViewContainerRef
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
export class QuestionGroupCollectionComponent<T = string | string[]> implements AfterContentInit {
  @Input({required: true}) name: string = '';
  @Output() onValueChanged = new EventEmitter<Map<string, Map<string, T>>>();

  @ViewChild('container', { read: ViewContainerRef, static: true }) container!: ViewContainerRef;
  @ContentChildren(QuestionGroupComponent, {descendants: true}) questionGroups!: QueryList<QuestionGroupComponent<T>>;

  data: Map<string, Map<string, T>> = new Map<string, Map<string, T>>();

  constructor(private viewContainerRef: ViewContainerRef) {}

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

  ngAfterContentInit(): void {
    this.viewContainerRef.clear();

    // console.log(`QuestionGroups: ${this.questionGroups.length}`);

    this.questionGroups.forEach((questionGroup, i) => {
      // console.log(`QuestionGroup: ${i}`);

      const context = { separator: false };

      if(i + 1 !== this.questionGroups.length) {
        context.separator = true;
      }

      this.viewContainerRef.createEmbeddedView(questionGroup.template, context);

      questionGroup.onValueChanged.subscribe((newValue: KeyValue<string, KeyValue<string, T>>) => {
        this.valueChange(newValue.key, newValue.value);
      });
    });
  }
}
