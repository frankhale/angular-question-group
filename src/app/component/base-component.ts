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
import {FormControlName, FormGroup} from '@angular/forms';

export type ControlType = 'text' | 'radio' | 'checkbox' | 'date' | 'button';

@Component({
  template: ``,
  inputs: ['question'],
  hostDirectives: [QuestionDirective]
})
export abstract class QuestionInputComponent<T> implements AfterViewInit, OnInit {
  @Input({required: true}) name: string = '';
  @Input({required: true}) title: string = '';
  @Input({required: true}) formGroup!: FormGroup;
  @Input() formControlName?: FormControlName;
  @Input() initialValue: T | undefined;
  @Output() onValueChanged = new EventEmitter<T>();
  @ViewChild("component", {static: true}) template!: TemplateRef<any>;

  abstract controlType: ControlType;

  value: T | undefined;

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    if(this.formGroup) {
      this.formGroup.get(this.name)?.valueChanges.subscribe(value => {
        console.log(`value changed: ${value}`);
        this.valueChanged(value);
      });
    }
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
