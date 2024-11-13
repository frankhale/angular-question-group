import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef, ViewChild
} from '@angular/core';
import {QuestionDirective} from '../directives/question-directive';

export type ControlType = 'text' | 'radio' | 'checkbox' | 'date' | 'button';

@Component({
  template: ``,
  inputs: ['question'],
  hostDirectives: [QuestionDirective]
})
export abstract class QuestionInputComponent<T> implements AfterViewInit {
  @Input({required: true}) name: string = '';
  @Input({required: true}) title: string = '';
  @Input() initialValue: T | undefined;
  @Output() onValueChanged = new EventEmitter<T>();
  @ViewChild("component", {static: true}) template!: TemplateRef<any>;

  abstract controlType: ControlType;

  value: T | undefined;

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngAfterViewInit() {
    this.valueChanged(this.initialValue, true);
    if (this.value) {
      console.log(`value: ${this.value}`);
    }
  }

  public valueChanged(value?: T, initial?: boolean) {
    if (value) {
      this.value = value;
      this.onValueChanged.emit(this.value);

      console.log(`baseComponent: valueChanged = ${value}`);

      if (initial) {
        this.cdr.detectChanges();
      }
    }
  }
}
