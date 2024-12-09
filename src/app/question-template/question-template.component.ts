import {Component, contentChildren, input, TemplateRef, viewChild} from '@angular/core';
import {QuestionComponent} from '../question/question.component';
import {NgForOf, NgTemplateOutlet} from '@angular/common';
import {YesNoOrEmpty} from '../models/yes-no-empty';

@Component({
  selector: 'app-question-template',
  imports: [
    NgForOf,
    NgTemplateOutlet
  ],
  templateUrl: './question-template.component.html',
  styleUrl: './question-template.component.scss'
})
export class QuestionTemplateComponent {
  readonly template = viewChild.required<TemplateRef<any>>("questionTemplate");
  readonly questions = contentChildren(QuestionComponent);
  showOnAnswer = input.required<YesNoOrEmpty>();
}
