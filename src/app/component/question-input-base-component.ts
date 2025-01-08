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
import {FormControlName, FormGroup, ValidatorFn} from '@angular/forms';
import {YesNoOrEmpty} from '../models/yes-no-empty';
import {ControlType} from '../models/control-type';

@Component({
    template: '',
    inputs: ['question'],
    hostDirectives: [QuestionDirective],
})
export abstract class QuestionInputComponent<T> implements AfterViewInit {
  readonly name = input.required<string>();
  readonly title = input<string>();
  readonly showOnAnswer = input.required<YesNoOrEmpty>();
  readonly formControlName = input<FormControlName>();
  readonly initialValue = input<T>();
  readonly formGroup = model<FormGroup>();
  readonly template = viewChild.required<TemplateRef<any>>("component");
  readonly onValueChanged = output<T>();

  validators: ValidatorFn[] | null = null;

  abstract controlType: ControlType;

  _value: T | undefined;

  constructor(private cdr: ChangeDetectorRef) {
  }

  public get value() {
    return this._value;
  }

  ngAfterViewInit() {
    const initialValue = this.initialValue();
    if (initialValue) {
      this.valueChanged(initialValue, true);
    }

    const formGroup = this.formGroup();
    if (formGroup) {
      const control = formGroup.get(this.name());

      if(control) {
        this.validators = control.validator ? [control.validator] : null;
        control.valueChanges.subscribe(value => {
          this.valueChanged(value);
        });
      }
    }
  }

  toggleValidators(value: boolean) {
    const control = this.formGroup()?.get(this.name());

    if(control) {
      if (value) {
        control.setValidators(this.validators);
      } else {
        control?.setValidators(null);
      }

      control.updateValueAndValidity();
    }
  }

  valueChanged(value?: T, initial?: boolean) {
    if (value) {
      this._value = value;
      this.onValueChanged.emit(this._value);

      if (initial) {
        this.cdr.detectChanges();
      }
    }
  }
}
