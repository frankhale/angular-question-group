import {Component, input, TemplateRef, viewChild, ViewChild, ViewContainerRef, ProviderToken} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NameValue} from '../models/name-value';
import {ControlType, QuestionInputComponent} from '../component/question-input-base-component';
import {ChipCategory} from '../models/chip-category';

@Component({
  selector: 'app-question-input-chip-selector',
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, ReactiveFormsModule],
  providers: [{provide: QuestionInputComponent, useExisting: QuestionInputChipSelectorComponent}],
  templateUrl: './question-input-chip-selector.component.html',
  styleUrl: './question-input-chip-selector.component.scss'
})
export class QuestionInputChipSelectorComponent extends QuestionInputComponent<string> {
  controlType: ControlType = 'select';

  readonly categories = input.required<NameValue[]>();
  readonly chipCategories = input.required<ChipCategory[]>();

  readonly chipSelectorTemplate = viewChild.required<TemplateRef<any>>("chipSelectorTemplate");
  readonly chipContainerRef = viewChild.required("chipContainer", { read: ViewContainerRef });

  selected: string = "";

  onChipSelectorChange(event: any) {
    this.chipContainerRef().createEmbeddedView(this.chipSelectorTemplate());
  }
}
