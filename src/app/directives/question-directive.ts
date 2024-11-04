import {Directive} from '@angular/core';
import {QuestionInputComponent} from '../component/base-component';

@Directive({
  standalone: true,
  selector: '[question]',
})
export class QuestionDirective {
  constructor(public baseComponent: QuestionInputComponent) {}
}
