import {Component, EventEmitter, Input, Output} from '@angular/core';
import {QuestionDirective} from '../directives/question-directive';

@Component({
  template: ``,
  inputs: ['question'],
  hostDirectives: [QuestionDirective],
})
export abstract class QuestionInputComponent {
  @Input({ required: true }) name: string = '';
  @Input({ required: true }) title: string = '';
  @Output() onValueChanged = new EventEmitter<string>();

  value = '';

  public valueChanged(value: string) {
    //console.log(`QuestionInputComponent->valueChanged: ${value}`);
    if(value) {
      this.value = value;
      this.onValueChanged.emit(this.value);
    }
  }
}
