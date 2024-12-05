import {Component, input} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NameValue} from '../models/name-value';
import {ControlType, QuestionInputComponent} from '../component/question-input-base-component';

@Component({
  selector: 'app-question-input-chip-selector',
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule],
  providers: [{provide: QuestionInputComponent, useExisting: QuestionInputChipSelectorComponent}],
  templateUrl: './question-input-chip-selector.component.html',
  styleUrl: './question-input-chip-selector.component.scss'
})
export class QuestionInputChipSelectorComponent extends QuestionInputComponent<string> {
  controlType: ControlType = 'select';

  values = input.required<NameValue[]>();

  selected: string = "";
}
