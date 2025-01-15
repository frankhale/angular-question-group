import { Component, input, OnInit } from '@angular/core';
import { QuestionInputComponent } from '../component/question-input-base-component';
import { KeyValue } from '@angular/common';
import { Control } from '../models/control';
import { ControlType } from '../models/control-type';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatButton } from '@angular/material/button';

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
    MatButton,
  ],
  providers: [
    {
      provide: QuestionInputComponent,
      useExisting: QuestionInputControlPanelComponent,
    },
  ],
  templateUrl: './question-input-control-panel.component.html',
  styleUrl: './question-input-control-panel.component.scss',
})
export class QuestionInputControlPanelComponent
  extends QuestionInputComponent<KeyValue<string, KeyValue<string, any>[]>>
  implements OnInit
{
  controlType: ControlType = 'panel';

  readonly consentText = input<string>(
    'I have verified that the information provided above is correct.'
  );
  readonly controls = input.required<Control[]>();
  readonly submit =
    input<(value: KeyValue<string, KeyValue<string, any>[]>) => void>();

  consent: boolean = false;
  groupedControls: Array<Control[]> = [];

  ngOnInit() {
    this.groupedControls = Object.values(
      this.controls().reduce(
        (acc: { [key: number]: Control[] }, obj: Control) => {
          // Ensure row group exists
          if (!acc[obj.row]) {
            acc[obj.row] = [];
          }

          if (obj.type === 'checkbox') {
            let checkboxGroup: any = acc[obj.row].find(
              (item) => Array.isArray(item) && item[0]?.type === 'checkbox'
            );
            if (!checkboxGroup) {
              checkboxGroup = [];
              acc[obj.row].push(checkboxGroup);
            }
            checkboxGroup.push(obj);
          } else {
            acc[obj.row].push(obj);
          }

          return acc;
        },
        {} as { [key: number]: Control[] }
      )
    );

    //console.log(this.groupedControls);
  }

  public override get value(): KeyValue<string, KeyValue<string, any>[]> {
    //console.log('get value() called on QuestionInputControlPanelComponent');

    let values: KeyValue<string, KeyValue<string, any>[]>[] = [];

    let finalValues = {
      key: this.name(),
      value: [{ key: 'consent', value: this.consent }],
    };

    if (this.formGroup()) {
      // iterate over the controls array but look inside the formGroup
      // to get the controls value
      this.controls().forEach((control) => {
        const formControl = this.formGroup()?.get(control.name);

        if (formControl) {
          finalValues.value.push({
            key: control.name,
            value: formControl.value,
          });
        }
      });
    }

    return finalValues;
  }

  onSelectControlChanged(name: string, event: any) {
    //console.log(`name = ${name}, event =`, event);

    if (name === 'consent') {
      this.consent = event.checked;
      //console.log(`toggling consent to ${this.consent}`);
    } //else {
    //console.log(`${name} changed to ${event.value}`);
    //}
  }

  onSubmit() {
    if (this.submit()) {
      this.submit()?.(this.value);
    }
  }

  protected readonly Array = Array;
}
