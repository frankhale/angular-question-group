import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  TemplateRef,
  input, model,
  output,
  viewChild
} from '@angular/core';
import {QuestionDirective} from '../directives/question-directive';
import {FormControlName, FormGroup} from '@angular/forms';

export type ControlType = 'text' | 'radio' | 'checkbox' | 'date' | 'button';

@Component({
    template: ``,
    inputs: ['question'],
    hostDirectives: [QuestionDirective],
    standalone: false
})
export abstract class QuestionInputComponent<T> implements AfterViewInit {
  readonly name = input.required<string>();
  readonly title = input.required<string>();
  readonly formControlName = input<FormControlName>();
  readonly initialValue = input<T>();
  readonly formGroup = model<FormGroup>();
  readonly onValueChanged = output<T>();
  readonly template = viewChild.required<TemplateRef<any>>("component");

  abstract controlType: ControlType;

  value: T | undefined;

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngAfterViewInit() {
    const initialValue = this.initialValue();
    if (initialValue) {
      this.valueChanged(initialValue, true);
    }

    const formGroup = this.formGroup();
    if (formGroup) {
      formGroup.get(this.name())?.valueChanges.subscribe(value => {
        this.valueChanged(value);
      });
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
