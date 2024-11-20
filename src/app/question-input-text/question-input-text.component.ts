import {Component, TemplateRef} from '@angular/core';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ControlType, QuestionInputComponent} from '../component/question-input-base-component';

@Component({
    selector: 'app-question-input-text',
    imports: [
        MatFormField,
        MatInput,
        FormsModule,
        MatLabel,
        ReactiveFormsModule
    ],
    providers: [{ provide: QuestionInputComponent, useExisting: QuestionInputTextComponent }],
    templateUrl: './question-input-text.component.html',
    styleUrl: './question-input-text.component.scss'
})
export class QuestionInputTextComponent extends QuestionInputComponent<string> {
  controlType: ControlType = 'text';
}
