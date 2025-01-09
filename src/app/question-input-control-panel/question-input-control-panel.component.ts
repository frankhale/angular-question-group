import {Component, input, OnInit} from '@angular/core';
import {QuestionInputComponent} from '../component/question-input-base-component';
import {KeyValue} from '@angular/common';
import {Control} from '../models/control';
import {ControlType} from '../models/control-type';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-question-input-control-panel',
  imports: [
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
    MatInput,
    MatCheckbox,
    MatButton
  ],
  providers: [{provide: QuestionInputComponent, useExisting: QuestionInputControlPanelComponent}],
  templateUrl: './question-input-control-panel.component.html',
  styleUrl: './question-input-control-panel.component.scss'
})
export class QuestionInputControlPanelComponent extends QuestionInputComponent<Map<string, KeyValue<string, string>>> implements OnInit {
  controlType: ControlType = 'panel';

  readonly consentText = input<string>("I have verified that the information provided above is correct.");
  readonly controls = input.required<Control[]>();

  consent: boolean = false;
  groupedControls: Array<Control[]> = [];

  ngOnInit() {
    this.groupedControls = Object.values(this.controls().reduce((acc: { [key: number]: Control[] }, obj: Control) => {
      // Ensure row group exists
      if (!acc[obj.row]) {
        acc[obj.row] = [];
      }

      if (obj.type === "checkbox") {
        let fooGroup: any = acc[obj.row].find(item => Array.isArray(item) && item[0]?.type === "checkbox");
        if (!fooGroup) {
          fooGroup = [];
          acc[obj.row].push(fooGroup);
        }
        fooGroup.push(obj);
      } else {
        acc[obj.row].push(obj);
      }

      return acc;
    }, {} as { [key: number]: Control[] }));

    console.log(this.groupedControls);
  }

  onSelectControlChanged(name: string, event: any) {
    console.log(`name = ${name}, event =`, event);

    if(name === "consent") {
      this.consent = event.checked;
      console.log(`toggling consent to ${this.consent}`);
    } else {
      console.log(`${name} changed to ${event.value}`);
    }
  }

  protected readonly Array = Array;
}
