import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {QuestionDirective} from '../directives/question-directive';
import {FormControlName, FormGroup} from '@angular/forms';

export type ControlType = 'text' | 'radio' | 'checkbox' | 'date' | 'button';

@Component({
  template: ``,
  inputs: ['question'],
  hostDirectives: [QuestionDirective]
})
export abstract class QuestionInputComponent<T> implements AfterViewInit {
  @Input({required: true}) name: string = '';
  @Input({required: true}) title: string = '';
  @Input() formGroup!: FormGroup;
  @Input() formControlName?: FormControlName;
  @Input() initialValue: T | undefined;
  @Output() onValueChanged = new EventEmitter<T>();
  @ViewChild("component", {static: true}) template!: TemplateRef<any>;

  abstract controlType: ControlType;

  value: T | undefined;

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngAfterViewInit() {
    if (this.initialValue) {
      this.valueChanged(this.initialValue, true);
    }

    if (this.formGroup) {
      this.formGroup.get(this.name)?.valueChanges.subscribe(value => {
        console.log(`value changed: ${value}`);
        this.valueChanged(value);
      });
    } else {
      console.log(`formGroup is undefined`);
    }
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
