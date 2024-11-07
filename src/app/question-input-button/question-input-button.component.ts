import {Component, EventEmitter, Input, Output} from '@angular/core';
import {QuestionInputComponent} from '../component/base-component';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-question-input-button',
  standalone: true,
  providers: [{provide: QuestionInputComponent, useExisting: QuestionInputButtonComponent}],
  imports: [
    MatButton
  ],
  templateUrl: './question-input-button.component.html',
  styleUrl: './question-input-button.component.scss'
})
export class QuestionInputButtonComponent extends QuestionInputComponent<void> {
  @Input() text: string = '';
  @Output() onClicked = new EventEmitter<void>();

  public onClick() {
    this.onClicked.emit();
  }
}
