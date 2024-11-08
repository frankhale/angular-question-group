import {Component, Input} from '@angular/core';
import {ControlType, QuestionInputComponent} from '../component/base-component';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {FormControl, FormsModule} from '@angular/forms';

@Component({
  selector: 'app-question-input-radio-group',
  standalone: true,
  providers: [{provide: QuestionInputComponent, useExisting: QuestionInputRadioGroupComponent}],
  imports: [
    MatRadioButton,
    MatRadioGroup,
    FormsModule
  ],
  templateUrl: './question-input-radio-group.component.html',
  styleUrl: './question-input-radio-group.component.scss'
})
export class QuestionInputRadioGroupComponent extends QuestionInputComponent<string> {
  @Input({required: true}) options: Array<{ name: string, value: string }> = [];

  controlType: ControlType =  'radio';
}
