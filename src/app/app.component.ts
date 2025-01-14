import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSnackBar, MatSnackBarLabel } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { KeyValue } from '@angular/common';
import { QuestionComponent } from './question/question.component';
import { QuestionGroupComponent } from './question-group/question-group.component';
import { QuestionInputTextComponent } from './question-input-text/question-input-text.component';
import { QuestionTemplateComponent } from './question-template/question-template.component';

@Component({
  selector: 'app-cool-snack-bar',
  template: ` <div matSnackBarLabel>Hello, World!</div>`,
  imports: [MatSnackBarLabel],
})
export class CoolSnackBarComponent {}

@Component({
  selector: 'app-root',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    QuestionComponent,
    QuestionGroupComponent,
    QuestionInputTextComponent,
    QuestionTemplateComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'question-app';
  data: Map<string, Map<string, string | string[]>> = new Map<
    string,
    Map<string, string | string[]>
  >();
  formGroup!: FormGroup;

  taskCount: KeyValue<string, number>[] = [];

  private _snackBar = inject(MatSnackBar);

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      name: ['Frank'],
      age: ['49'],
    });
  }

  //valueChange(kv: KeyValue<string, string | string[]>) {
  valueChange(kv: KeyValue<string, KeyValue<string, any>[]>[]) {
    console.log(kv);
    // if (kv.value.value === 'DELETE_ME') {
    //   // console.log(
    //   //   `Deleting ${kv.value.key} with value ${kv.value.value}`);
    //   this.data.get(kv.key)?.delete(kv.value.key);
    // } else {
    //   if (kv.value.value !== '') {
    //     if (!this.data.has(kv.key)) {
    //       this.data.set(kv.key, new Map<string, string | any[]>());
    //     }
    //     this.data.get(kv.key)?.set(kv.value.key, kv.value.value);
    //   } else {
    //     this.data.delete(kv.key);
    //   }
    // }
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
    const existingIndex = this.taskCount.findIndex(
      (item) => item.key === result.key
    );
    if (existingIndex !== -1) {
      this.taskCount[existingIndex] = result;
    } else {
      this.taskCount.push(result);
    }

    let total = 0;
    this.taskCount.forEach((item) => {
      total += item.value;
    });

    //console.log(`Total count of children: ${total}`);
  }
}
