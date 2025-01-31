import { Component, input, ChangeDetectorRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatFormField, MatLabel } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatButton } from '@angular/material/button';
import { MatChip } from '@angular/material/chips';
import { QuestionInputComponent } from '../component/question-input-base-component';
import { ControlType } from '../models/control-type';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-question-input-chip-selector',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormField,
    MatSelect,
    MatOption,
    MatLabel,
    MatButton,
    ReactiveFormsModule,
    MatChip
  ],
  providers: [{ provide: QuestionInputComponent, useExisting: QuestionInputChipSelectorComponent }],
  templateUrl: './question-input-chip-selector.component.html',
  styleUrl: './question-input-chip-selector.component.scss'
})
export class QuestionInputChipSelectorComponent extends QuestionInputComponent<KeyValue<string, string[]>[]> {
  controlType: ControlType = 'select';

  readonly options = input.required<KeyValue<string, string[]>[]>();
  readonly mainOptionsLabel = input.required<string>();
  readonly subOptionsLabel = input.required<string>();

  subOptions: string[] = [];

  selectedChips: KeyValue<string, string[]>[] = [];
  chipForm: FormGroup;

  constructor(private fb: FormBuilder, cdr: ChangeDetectorRef) {
    super(cdr);

    this.chipForm = this.fb.group({
      main: [''],
      sub: [{ value: '', disabled: true }]
    });
  }

  mainOptionsSelectionChange($event: any) {
    this.subOptions = [];

    const selectedMainOption = this.options().find(entry => entry.key === $event.value);
    const changeOptions = selectedMainOption?.value || [];

    if (changeOptions.length > 0) {
      this.subOptions = changeOptions;
      this.chipForm.get('sub')?.enable();
    } else {
      this.chipForm.get('sub')?.disable();
    }
  }

  addChip(key: string, newValue: string) {
    if (!key || !newValue) return;

    // Find if the key already exists
    const existingEntry = this.selectedChips.find(entry => entry.key === key);

    if (existingEntry) {
      // If found, add the new value to the existing array (if not already present)
      if (!existingEntry.value.includes(newValue)) {
        existingEntry.value.push(newValue);
        existingEntry.value.sort();
      }
    } else {
      // If not found, add a new entry
      this.selectedChips.push({ key, value: [newValue] });
    }

    this.selectedChips.sort((a, b) => a.key.localeCompare(b.key));
  }

  addEvent() {
    this.addChip(this.chipForm.get('main')?.value, this.chipForm.get('sub')?.value);
    console.table(this.selectedChips);
  }

  removeChip(key: string, value: string) {
    const existingEntry = this.selectedChips.find(entry => entry.key === key);
    if (existingEntry) {
      existingEntry.value = existingEntry.value.filter(v => v !== value);

      if (existingEntry.value.length === 0) {
        this.selectedChips = this.selectedChips.filter(entry => entry.key !== key);
      }
    }
  }
}
