import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatLabel} from '@angular/material/form-field';
import {ChangeDetectionStrategy} from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core'
import {QuestionInputComponent} from '../component/base-component';

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
  styleUrl: './question-input-date.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionInputDateComponent extends QuestionInputComponent<string> {
}
