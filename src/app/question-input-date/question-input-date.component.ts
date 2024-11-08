import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {provideNativeDateAdapter} from '@angular/material/core'
import {ControlType, QuestionInputComponent} from '../component/base-component';

@Component({
  selector: 'app-question-input-date',
  standalone: true,
  providers: [provideNativeDateAdapter(),
    {provide: QuestionInputComponent, useExisting: QuestionInputDateComponent}],
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatLabel,
    MatDatepickerModule,
  ],
  templateUrl: './question-input-date.component.html',
  styleUrl: './question-input-date.component.scss'
})
export class QuestionInputDateComponent extends QuestionInputComponent<string> {
  controlType: ControlType = 'date';

  // initialValue is in the form of 2024-11-08T05:00:00.000Z
}
