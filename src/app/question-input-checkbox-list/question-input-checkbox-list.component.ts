import {Component, input} from '@angular/core';
import {ControlType, QuestionInputComponent} from '../component/question-input-base-component';
import {MatCheckbox} from '@angular/material/checkbox';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-question-input-checkbox-list',
  providers: [{provide: QuestionInputComponent, useExisting: QuestionInputCheckboxListComponent}],
  imports: [MatCheckbox, FormsModule, ReactiveFormsModule],
  templateUrl: './question-input-checkbox-list.component.html',
  styleUrl: './question-input-checkbox-list.component.scss'
})
export class QuestionInputCheckboxListComponent extends QuestionInputComponent<string[]> {
  readonly options = input.required<Array<{ name: string; }>>();

  controlType: ControlType = 'checkbox';

  private optionsChecked: string[] = [];

  onCheckboxChange(name: string | null, checked: boolean) {
    if (checked) {
      this.optionsChecked.push(name!);
    } else {
      this.optionsChecked = this.optionsChecked.filter(option => option !== name);
    }

    this.onValueChanged.emit(this.optionsChecked);
  }
}
