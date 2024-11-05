import {Component, EventEmitter, Input, Output} from '@angular/core';
import {QuestionDirective} from '../directives/question-directive';

@Component({
  template: ``,
  inputs: ['question'],
  hostDirectives: [QuestionDirective],
})
export abstract class QuestionInputComponent<T> {
  @Input({required: true}) name: string = '';
  @Input({required: true}) title: string = '';
  @Output() onValueChanged = new EventEmitter<T>();

  value?: T;

  public valueChanged(value: T) {
    //console.log('value changed', value);
    if (value) {
      this.value = value;
      this.onValueChanged.emit(this.value);
    }
  }
}
