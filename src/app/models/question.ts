import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Directive} from '@angular/core';

export interface Question {
  question: string;
  answer: string;
}

@Component({
  template: ``
})
export abstract class QuestionInputComponent {
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

@Directive({
  standalone: true,
  selector: '[question]',
})
export class QuestionDirective {
  constructor(public baseComponent: QuestionInputComponent) {}
}

export type YesNoOrEmpty = 'yes' | 'no' | '';
