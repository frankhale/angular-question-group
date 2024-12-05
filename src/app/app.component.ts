import {Component, inject} from '@angular/core';
import {QuestionComponent} from './question/question.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSnackBar, MatSnackBarLabel, MatSnackBarRef,} from '@angular/material/snack-bar';
import {MatButton} from '@angular/material/button';
import {KeyValue} from '@angular/common';
import {QuestionTemplateComponent} from './question-template/question-template.component';

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
  imports: [QuestionComponent,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButton, ReactiveFormsModule, QuestionTemplateComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'question-app';
  are_you_cool_completed = false;
  data: Map<string, Map<string, string | string[]>> = new Map<string, Map<string, string | string[]>>();
  formGroup!: FormGroup;
  private _snackBar = inject(MatSnackBar);

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      chip_selector: []
      // name_input: ['', Validators.required],
      // date_input: ['', Validators.required],
      // radio_group: [],
      // checkbox_list: [],
    });
  }

  valueChange(kv: KeyValue<string, string | string[]>) {
    console.log(kv);

    // if (kv.value.value !== '') {
    //   if (!this.data.has(kv.key)) {
    //     this.data.set(kv.key, new Map<string, string | string[]>());
    //   }
    //   this.data.get(kv.key)?.set(kv.value.key, kv.value.value);
    // } else {
    //   this.data.delete(kv.key);
    // }
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
