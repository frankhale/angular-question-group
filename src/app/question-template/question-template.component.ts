import {
  Component,
  contentChildren,
  forwardRef,
  input,
  TemplateRef,
  viewChild,
} from "@angular/core";
import { YesNoOrEmpty } from "../models/yes-no-empty";
import { QuestionComponent } from "../question/question.component";
import { NgTemplateOutlet } from "@angular/common";

@Component({
  selector: "app-question-template",
  imports: [NgTemplateOutlet],
  templateUrl: "./question-template.component.html",
  styleUrl: "./question-template.component.scss",
})
export class QuestionTemplateComponent {
  readonly template = viewChild.required<TemplateRef<any>>("questionTemplate");
  readonly questions = contentChildren(forwardRef(() => QuestionComponent));
  readonly showOnAnswer = input<YesNoOrEmpty>("");
}
