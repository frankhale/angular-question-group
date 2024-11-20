import {Component, Input} from '@angular/core';
import {ControlType, QuestionInputComponent} from '../component/question-input-base-component';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-question-input-radio-group',
    providers: [{ provide: QuestionInputComponent, useExisting: QuestionInputRadioGroupComponent }],
    imports: [
        MatRadioButton,
        MatRadioGroup,
        FormsModule,
        CommonModule,
        ReactiveFormsModule
    ],
    templateUrl: './question-input-radio-group.component.html',
    styleUrl: './question-input-radio-group.component.scss'
})
export class QuestionInputRadioGroupComponent extends QuestionInputComponent<string> {
  @Input({required: true}) options: Array<{ name: string, value: string }> = [];

  controlType: ControlType = 'radio';
}
