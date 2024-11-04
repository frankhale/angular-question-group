import {Component} from '@angular/core';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {QuestionInputComponent} from '../models/question';

@Component({
  selector: 'app-question-input-text',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    FormsModule,
    MatLabel
  ],
  providers: [{ provide: QuestionInputComponent, useExisting: QuestionInputTextComponent }],
  templateUrl: './question-input-text.component.html',
  styleUrl: './question-input-text.component.scss'
})
export class QuestionInputTextComponent extends QuestionInputComponent { }
