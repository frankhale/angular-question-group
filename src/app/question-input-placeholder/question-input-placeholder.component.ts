import {Component, input} from '@angular/core';
import {ControlType, QuestionInputComponent} from '../component/question-input-base-component';

@Component({
  selector: 'app-question-input-placeholder',
  imports: [],
  providers: [{provide: QuestionInputComponent, useExisting: QuestionInputPlaceholderComponent}],
  templateUrl: './question-input-placeholder.component.html',
  styleUrl: './question-input-placeholder.component.scss'
})
export class QuestionInputPlaceholderComponent extends QuestionInputComponent<string> {
  controlType: ControlType = 'placeholder';

  readonly placeholderText = input.required<string>();
}
