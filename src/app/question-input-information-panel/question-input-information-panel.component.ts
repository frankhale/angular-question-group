import {Component, input} from '@angular/core';
import {ControlType, QuestionInputComponent} from '../component/question-input-base-component';
import {KeyValue} from '@angular/common';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';

@Component({
  selector: 'app-question-input-information-panel',
  imports: [MatGridList, MatGridTile],
  providers: [{provide: QuestionInputComponent, useExisting: QuestionInputInformationPanelComponent}],
  templateUrl: './question-input-information-panel.component.html',
  styleUrl: './question-input-information-panel.component.scss'
})
export class QuestionInputInformationPanelComponent extends QuestionInputComponent<void> {
  controlType: ControlType = 'panel';

  readonly info = input.required<KeyValue<string, string>[]>();
}
