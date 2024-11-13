import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ControlType, QuestionInputComponent} from '../component/base-component';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-question-input-button',
  standalone: true,
  providers: [{provide: QuestionInputComponent, useExisting: QuestionInputButtonComponent}],
  imports: [
    MatButton
  ],
  inputs: ['formGroup: defaultFormGroup'],
  templateUrl: './question-input-button.component.html',
  styleUrl: './question-input-button.component.scss'
})
export class QuestionInputButtonComponent extends QuestionInputComponent<void> {
  @Input() text: string = '';
  @Output() buttonClick = new EventEmitter<void>();

  defaultFormGroup = new FormGroup({});

  controlType: ControlType = 'button';

  onButtonClick() {
    this.buttonClick.emit(); // Emit the click event
  }
}
