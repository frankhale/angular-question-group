import {Component, input, output} from '@angular/core';
import {QuestionInputComponent} from '../component/question-input-base-component';
import {MatButton} from '@angular/material/button';
import {ControlType} from '../models/control-type';

@Component({
    selector: 'app-question-input-button',
    providers: [{ provide: QuestionInputComponent, useExisting: QuestionInputButtonComponent }],
    imports: [
        MatButton
    ],
    templateUrl: './question-input-button.component.html',
    styleUrl: './question-input-button.component.scss'
})
export class QuestionInputButtonComponent extends QuestionInputComponent<void> {
  readonly text = input.required<string>();
  readonly buttonClick = output<void>();

  controlType: ControlType = 'button';

  onButtonClick() {
    this.buttonClick.emit(); // Emit the click event
  }
}
