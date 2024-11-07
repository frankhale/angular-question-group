import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {QuestionComponent} from './question/question.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatSnackBar, MatSnackBarLabel, MatSnackBarRef,} from '@angular/material/snack-bar';
import {QuestionInputTextComponent} from './question-input-text/question-input-text.component';
import {QuestionGroupComponent} from './question-group/question-group.component';
import {QuestionInputDateComponent} from './question-input-date/question-input-date.component';
import {QuestionGroupCollectionComponent} from './question-group-collection/question-group-collection.component';
import {QuestionInputRadioGroupComponent} from './question-input-radio-group/question-input-radio-group.component';
import {
  QuestionInputCheckboxListComponent
} from './question-input-checkbox-list/question-input-checkbox-list.component';
import {QuestionInputButtonComponent} from './question-input-button/question-input-button.component';

@Component({
  selector: 'app-cool-snack-bar',
  standalone: true,
  template: `
    <div matSnackBarLabel>You really are cool!!!</div>`,
  imports: [
    MatSnackBarLabel
  ]
})
export class CoolSnackBarComponent {
  snackBarRef = inject(MatSnackBarRef);
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    QuestionGroupComponent,
    QuestionComponent,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    QuestionInputTextComponent,
    QuestionInputDateComponent,
    QuestionGroupCollectionComponent,
    QuestionInputRadioGroupComponent,
    QuestionInputCheckboxListComponent,
    QuestionInputButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'question-app';
  are_you_cool_completed = false;
  private _snackBar = inject(MatSnackBar);

  valueChanged(data: Map<string, Map<string, string | string[]>>) {
    console.table(data);
  }

  openSnackBar() {
    this._snackBar.openFromComponent(CoolSnackBarComponent, {
      duration: 3000,
    });
  }
}
