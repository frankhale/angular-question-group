import {ControlType} from './control-type';
import {KeyValue} from '@angular/common';

export interface Control {
  name: string;
  label: string;
  placeholder?: string;
  row: number;
  type: ControlType;
  required: boolean;
  options?: KeyValue<string,string>[];
}
