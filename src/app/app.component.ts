import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QuestionComponent } from './question/question.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { QuestionInputTextComponent } from './question-input-text/question-input-text.component';
import { QuestionGroupComponent } from './question-group/question-group.component';
import { KeyValue } from '@angular/common';
import {QuestionInputDateComponent} from './question-input-date/question-input-date.component';
import {QuestionGroupCollectionComponent} from './question-group-collection/question-group-collection.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, QuestionGroupComponent, QuestionComponent, MatInputModule, MatFormFieldModule, FormsModule, QuestionInputTextComponent, QuestionInputDateComponent, QuestionGroupCollectionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'question-app';
  are_you_cool_completed = false;

  valueChanged(data: Map<string, Map<string, string>>) {
    console.table(data);
  }
}
