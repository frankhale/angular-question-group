import {Component, inject} from '@angular/core';
import {QuestionComponent} from './question/question.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatSnackBar, MatSnackBarLabel, MatSnackBarRef,} from '@angular/material/snack-bar';
import {QuestionInputTextComponent} from './question-input-text/question-input-text.component';
import {QuestionGroupComponent} from './question-group/question-group.component';
import {QuestionInputDateComponent} from './question-input-date/question-input-date.component';
import {QuestionGroupCollectionComponent} from './question-group-collection/question-group-collection.component';
import {QuestionInputButtonComponent} from './question-input-button/question-input-button.component';
import {MatButton} from '@angular/material/button';
import {QuestionInputRadioGroupComponent} from './question-input-radio-group/question-input-radio-group.component';
import {
  QuestionInputCheckboxListComponent
} from './question-input-checkbox-list/question-input-checkbox-list.component';
import {KeyValue} from '@angular/common';

@Component({
    selector: 'app-cool-snack-bar',
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
    imports: [QuestionGroupComponent,
        QuestionComponent,
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
        QuestionInputTextComponent,
        QuestionInputDateComponent,
        QuestionGroupCollectionComponent,
        QuestionInputButtonComponent, MatButton, ReactiveFormsModule, QuestionInputRadioGroupComponent, QuestionInputCheckboxListComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'question-app';
  are_you_cool_completed = false;
  private _snackBar = inject(MatSnackBar);

  data: Map<string, Map<string, string | string[]>> = new Map<string, Map<string, string | string[]>>();

  formGroup!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      name_input: ['', Validators.required],
      date_input: ['', Validators.required],
      radio_group: [],
      checkbox_list: [],
    });
  }

  valueChange(kv: KeyValue<string, KeyValue<string, string | string[]>>) {
    if (kv.value.value !== '') {
      if (!this.data.has(kv.key)) {
        this.data.set(kv.key, new Map<string, string | string[]>());
      }
      this.data.get(kv.key)?.set(kv.value.key, kv.value.value);
    } else {
      this.data.delete(kv.key);
    }
  }

  submit() {
    if (!this.formGroup.valid) {
      console.log('Form is not valid');
      this.formGroup.markAllAsTouched();
      return;
    }

    for (const key of this.data.keys()) {
      console.log(`Group: ${key}`);
      console.log(this.data.get(key));
    }
  }

  openSnackBar() {
    this._snackBar.openFromComponent(CoolSnackBarComponent, {
      duration: 3000,
    });
  }
}
