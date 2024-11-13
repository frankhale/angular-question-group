import {
  AfterViewInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {FormsModule} from '@angular/forms';
import {YesNoOrEmpty} from '../models/yes-no-empty';
import {KeyValue} from '@angular/common';
import {QuestionInputComponent} from '../component/base-component';
import {QuestionDirective} from '../directives/question-directive';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [
    MatGridTile,
    MatGridList,
    MatRadioGroup,
    MatRadioButton,
    FormsModule
  ],
  providers: [{provide: QuestionInputComponent, useExisting: QuestionComponent}],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss'
})
export class QuestionComponent<T> implements AfterViewInit {
  @Input({required: true}) name: string = '';
  @Input({required: true}) question: string = '';
  @Input() showQuestionInputOnSelectedValue: YesNoOrEmpty = '';
  @Input() warning: string = '';
  @Input() info: string = '';
  @Input() completed: boolean = false;
  @Output() onQuestionAnswered = new EventEmitter<KeyValue<string, T>>();

  @ViewChild("questionTemplate", {static: true}) template!: TemplateRef<any>;
  @ViewChild('tempQuestionInputContainer', {read: ViewContainerRef}) tempQuestionInputContainer!: ViewContainerRef;
  @ViewChild('questionInputContainer', {read: ViewContainerRef}) questionInputContainer!: ViewContainerRef;

  @ContentChildren(QuestionDirective, {descendants: true}) questionInputs?: QueryList<QuestionDirective<T>>;

  selectedOption: string = '';

  // constructor(private viewContainerRef: ViewContainerRef) {
  // }

  ngAfterViewInit(): void {
    // this.viewContainerRef.clear();
    // this.viewContainerRef.createEmbeddedView(this.template);
  }

  onSelectedOption(value: T): void {
    this.questionInputContainer.clear();

    if (value === this.showQuestionInputOnSelectedValue) {
      this.questionInputs?.forEach(questionInput => {
        this.tempQuestionInputContainer.createEmbeddedView(questionInput.baseComponent.template);
      });

      const viewCount = this.tempQuestionInputContainer.length;
      for (let i = 0; i < viewCount; i++) {
        const view = this.tempQuestionInputContainer.detach(0); // Always detach the first (index 0) as views shift
        if (view) {
          this.questionInputContainer.insert(view); // Insert into finalContainer in wrapperTemplate
        }
      }
    }

    this.onQuestionAnswered.emit({key: this.name, value: value});
  }

}
