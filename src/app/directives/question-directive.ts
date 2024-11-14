import {Directive} from '@angular/core';
import {QuestionInputComponent} from '../component/question-input-base-component';

@Directive({
  standalone: true,
  selector: '[question]',
})
export class QuestionDirective<T> {
  constructor(public baseComponent: QuestionInputComponent<T>) {
  }
}
