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
import {group} from '@angular/animations';

@Component({
  selector: 'app-question-input-control-panel',
  imports: [
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
    MatInput
  ],
  providers: [{provide: QuestionInputComponent, useExisting: QuestionInputControlPanelComponent}],
  templateUrl: './question-input-control-panel.component.html',
  styleUrl: './question-input-control-panel.component.scss'
})
export class QuestionInputControlPanelComponent extends QuestionInputComponent<Map<string, KeyValue<string, string>>> implements OnInit {
  controlType: ControlType = 'panel';

  controls = input.required<Control[]>();

  groupedControls: Array<Control[]> = [];

  ngOnInit() {
    this.groupedControls = Object.values(this.controls().reduce((acc: { [key: number]: Control[] }, obj: Control) => {
      if (!acc[obj.row]) {
        acc[obj.row] = [];
      }
      acc[obj.row].push(obj);
      return acc;
    }, {} as { [key: number]: Control[] }));

    console.log(this.groupedControls);
  }

  onSelectControlChanged(name: string, event: any) {
    console.log(`${name} changed to ${event.value}`);
  }
}
