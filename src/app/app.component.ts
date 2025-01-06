import {Component, inject} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSnackBar, MatSnackBarLabel,} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import {KeyValue} from '@angular/common';
import {ActionGroup} from './models/action-group';
import {QuestionComponent} from './question/question.component';
import {QuestionTemplateComponent} from './question-template/question-template.component';
import {QuestionInputFileComponent} from './question-input-file/question-input-file.component';
import {ButtonGroupComponent} from './button-group/button-group.component';
import {QuestionGroupComponent} from './question-group/question-group.component';

@Component({
  selector: 'app-cool-snack-bar', template: `
    <div matSnackBarLabel>Hello, World!</div>`, imports: [MatSnackBarLabel,]
})
export class CoolSnackBarComponent {
}

@Component({
  selector: 'app-root',
  imports: [MatInputModule, MatFormFieldModule, FormsModule, MatButtonModule, ReactiveFormsModule, QuestionComponent, QuestionTemplateComponent, QuestionInputFileComponent, ButtonGroupComponent, QuestionGroupComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'question-app';
  data: Map<string, Map<string, string | string[]>> = new Map<string, Map<string, string | string[]>>();
  formGroup!: FormGroup;

  taskCount: KeyValue<string, number>[] = [];

  buttonActions: ActionGroup[] = [
  //   {
  //   name: "cancel", title: "Cancel", class: "white-button white-button-ripple"
  // }, {
  //   name: "save_draft", title: "Save Draft", class: "black-button"
  // }, {
  //   name: "generate_email", title: "Generate Email", class: "dark-gray-button"
  // }, {
  //   name: "mark_complete", title: "Mark Complete", class: "light-gray-button"
  // },
    {
    name: "submit", type: "submit", title: "Submit"
  }];

  private _snackBar = inject(MatSnackBar);

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      //name_input: ['', Validators.required],
      //date_input: ['', Validators.required],
      file_input: [null]
      //radio_group: [],
      //checkbox_list: [],
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
    console.log('Submitting');

    if (!this.formGroup.valid) {
      console.log('Form is not valid');
      this.formGroup.markAllAsTouched();
      return;
    }

    for (const key of this.data.keys()) {
      //console.log(`Group: ${key}`);
      console.log(this.data.get(key));
    }
  }

  openSnackBar() {
    this._snackBar.openFromComponent(CoolSnackBarComponent, {
      duration: 3000,
    });
  }

  childCountChanged(result: KeyValue<string, number>) {
    const existingIndex = this.taskCount.findIndex(item => item.key === result.key);
    if (existingIndex !== -1) {
      this.taskCount[existingIndex] = result;
    } else {
      this.taskCount.push(result);
    }

    let total = 0;
    this.taskCount.forEach(item => {
      total += item.value;
    });

    console.log(`Total count of children: ${total}`);
  }
}
