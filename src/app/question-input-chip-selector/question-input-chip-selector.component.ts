import {Component, input, TemplateRef, viewChild, ViewContainerRef} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NameValue} from '../models/name-value';
import {QuestionInputComponent} from '../component/question-input-base-component';
import {ChipCategory} from '../models/chip-category';
import {ControlType} from '../models/control-type';

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
  readonly chipContainerRef = viewChild.required("chipContainer", {read: ViewContainerRef});

  selected: string = "";
  private selectedCategoriesAndChips: ChipCategory[] = [];

  onChipSelectorChange(event: any) {
    if (this.selectedCategoriesAndChips.some(category => category.category === event.value)) {
      return;
    }

    this.selectedCategoriesAndChips.push({
      category: event.value,
      chips: []
    });

    this.chipContainerRef().createEmbeddedView(this.chipSelectorTemplate());
  }
}
