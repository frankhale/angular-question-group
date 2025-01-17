import {Component, input} from '@angular/core';
import {QuestionInputComponent,} from '../component/question-input-base-component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {MatButton, MatIconButton} from '@angular/material/button';
import {File} from '../models/file';
import {MatIcon} from '@angular/material/icon';
import {ControlType} from '../models/control-type';

@Component({
  selector: 'app-question-input-file',
  imports: [ReactiveFormsModule, NgIf, MatButton, MatIconButton, MatIcon],
  providers: [{
    provide: QuestionInputComponent, useExisting: QuestionInputFileComponent,
  },],
  templateUrl: './question-input-file.component.html',
  styleUrl: './question-input-file.component.scss',
})
export class QuestionInputFileComponent extends QuestionInputComponent<File[]> {
  controlType: ControlType = 'file';

  readonly buttonTitle = input.required<string>();
  readonly caption = input<string>();

  files: File[] = [];

  onDelete(event: any, id: string): void {
    this.files = this.files.filter((file) => file.id !== id);
    event.preventDefault();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }

    const file = input.files[0];
    const reader = new FileReader();
    const fileName = file.name;
    const fileType = file.type;

    reader.onload = () => {
      const result = reader.result as string;
      const fileContent = result.split(',')[1]; // Remove the Data URL prefix

      if (this.files.some((existingFile) => existingFile.fileName === fileName)) {
        return;
      }

      this.files.push({
        id: crypto.randomUUID(), fileContent, fileName, fileType,
      });
    };
    reader.readAsDataURL(file);

    if (input.files && input.files.length > 0) {
      this.formGroup()?.patchValue(this.files);
      this.formGroup()?.get(this.name())?.updateValueAndValidity(); // Update validity
    }

    this.onValueChanged.emit(this.files);
  }
}
