import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ControlType, QuestionInputComponent} from '../component/base-component';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-question-input-button',
  standalone: true,
  providers: [{provide: QuestionInputComponent, useExisting: QuestionInputButtonComponent}],
  imports: [
    MatButton
  ],
  templateUrl: './question-input-button.component.html',
  styleUrl: './question-input-button.component.scss'
})
export class QuestionInputButtonComponent extends QuestionInputComponent<void> {
  @Input() text: string = '';
  @Output() buttonClick = new EventEmitter<void>();

  controlType: ControlType = 'button';

  onButtonClick() {
    this.buttonClick.emit(); // Emit the click event
  }
}
