import {Component, Input} from '@angular/core';
import {QuestionInputComponent} from '../component/base-component';
import {MatCheckbox} from '@angular/material/checkbox';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-question-input-checkbox-list',
  standalone: true,
  providers: [{provide: QuestionInputComponent, useExisting: QuestionInputCheckboxListComponent}],
  imports: [
    MatCheckbox,
    FormsModule
  ],
  templateUrl: './question-input-checkbox-list.component.html',
  styleUrl: './question-input-checkbox-list.component.scss'
})
export class QuestionInputCheckboxListComponent extends QuestionInputComponent<string[]> {
  @Input({required: true}) options: Array<{ name: string }> = [];

  optionsChecked: string[] = [];

  onCheckboxChange(name: string | null, checked: boolean) {
    if (checked) {
      this.optionsChecked.push(name!);
    } else {
      this.optionsChecked = this.optionsChecked.filter(option => option !== name);
    }

    this.onValueChanged.emit(this.optionsChecked);
  }
}
