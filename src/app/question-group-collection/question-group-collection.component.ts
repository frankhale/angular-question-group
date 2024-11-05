import {AfterContentInit, Component, ContentChildren, EventEmitter, Input, Output, QueryList} from '@angular/core';
import {QuestionGroupComponent} from '../question-group/question-group.component';
import {KeyValue} from '@angular/common';

@Component({
  selector: 'app-question-group-collection',
  standalone: true,
  imports: [],
  templateUrl: './question-group-collection.component.html',
  styleUrl: './question-group-collection.component.scss'
})
export class QuestionGroupCollectionComponent implements AfterContentInit {
  @Input({ required: true }) name: string = '';
  @Output() onValueChanged = new EventEmitter<Map<string, Map<string, string>>>();
  @ContentChildren(QuestionGroupComponent, { descendants: true }) questionGroups!: QueryList<QuestionGroupComponent>;

  data: Map<string, Map<string, string>> = new Map<string, Map<string, string>>();

  valueChange(key: string, value: KeyValue<string, string>) {
    if(value.value !== '') {
      if (!this.data.has(key)) {
        this.data.set(key, new Map<string, string>());
      }
      this.data.get(key)?.set(value.key, value.value);
    } else {
      this.data.delete(key);
    }

    this.onValueChanged.emit(this.data);
  }

  ngAfterContentInit(): void {
    this.questionGroups.forEach(questionGroup => {
      questionGroup.onValueChanged.subscribe((newValue: KeyValue<string, KeyValue<string, string>>) => {
        this.valueChange(newValue.key, newValue.value);
      });
    });
  }
}
