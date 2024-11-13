import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {QuestionDirective} from '../directives/question-directive';
import {FormGroup} from '@angular/forms';

export type ControlType = 'text' | 'radio' | 'checkbox' | 'date' | 'button';

@Component({
  template: ``,
  inputs: ['question'],
  hostDirectives: [QuestionDirective]
})
export abstract class QuestionInputComponent<T> implements AfterViewInit, OnInit {
  @Input({required: true}) name: string = '';
  @Input({required: true}) title: string = '';
  @Input() formGroup?: FormGroup;
  @Input() initialValue: T | undefined;
  @Output() onValueChanged = new EventEmitter<T>();
  @ViewChild("component", {static: true}) template!: TemplateRef<any>;

  abstract controlType: ControlType;

  value: T | undefined;

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    console.log(`baseComponent->formGroup = ${this.formGroup}`);
  }

  ngAfterViewInit() {
    this.valueChanged(this.initialValue, true);
  }

  public valueChanged(value?: T, initial?: boolean) {
    if (value) {
      this.value = value;
      this.onValueChanged.emit(this.value);

      if (initial) {
        this.cdr.detectChanges();
      }
    }
  }
}
