import {Component, input} from '@angular/core';
import {ActionGroup} from '../models/action-group';
import {MatButton} from '@angular/material/button';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-button-group',
  imports: [
    MatButton,
    NgClass
  ],
  templateUrl: './button-group.component.html',
  styleUrl: './button-group.component.scss'
})
export class ButtonGroupComponent {
  readonly buttons = input.required<ActionGroup[]>();

  getColor(color?: string) {
    if(!color) return '';

    return `background-color: ${color} !important;`;
  }

  noAction() {}
}
