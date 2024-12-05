import {Component, inject} from '@angular/core';
import {QuestionComponent} from './question/question.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatSnackBar, MatSnackBarLabel,} from '@angular/material/snack-bar';
import {MatButton} from '@angular/material/button';
import {KeyValue} from '@angular/common';
import {QuestionTemplateComponent} from './question-template/question-template.component';
import {QuestionGroupCollectionComponent} from './question-group-collection/question-group-collection.component';
import {QuestionGroupComponent} from './question-group/question-group.component';
import {QuestionInputButtonComponent} from './question-input-button/question-input-button.component';
import {QuestionInputDateComponent} from './question-input-date/question-input-date.component';
import {QuestionInputTextComponent} from './question-input-text/question-input-text.component';

@Component({
  selector: 'app-cool-snack-bar',
  template: `
    <div matSnackBarLabel>Hello, World!</div>`,
  imports: [
    MatSnackBarLabel
  ]
})
export class CoolSnackBarComponent {
}

@Component({
  selector: 'app-root',
  imports: [QuestionComponent,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButton, ReactiveFormsModule, QuestionTemplateComponent, QuestionGroupCollectionComponent, QuestionGroupComponent, QuestionInputButtonComponent, QuestionInputDateComponent, QuestionInputTextComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'question-app';
  data: Map<string, Map<string, string | string[]>> = new Map<string, Map<string, string | string[]>>();
  formGroup!: FormGroup;
  private _snackBar = inject(MatSnackBar);

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      name_input: ['', Validators.required],
      date_input: ['', Validators.required],
      // radio_group: [],
      // checkbox_list: [],
    });
  }

  //valueChange(kv: KeyValue<string, string | string[]>) {
  valueChange(kv: KeyValue<string, KeyValue<string, string | string[]>>) {
    //console.log(kv);
    if (kv.value.value === 'DELETE_ME') {
      // console.log(
      //   `Deleting ${kv.value.key} with value ${kv.value.value}`);
      this.data.get(kv.key)?.delete(kv.value.key);
    } else {
      if (kv.value.value !== '') {
        if (!this.data.has(kv.key)) {
          this.data.set(kv.key, new Map<string, string | string[]>());
        }
        this.data.get(kv.key)?.set(kv.value.key, kv.value.value);
      } else {
        this.data.delete(kv.key);
      }
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
