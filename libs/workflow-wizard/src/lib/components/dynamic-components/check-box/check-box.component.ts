/* eslint-disable @angular-eslint/no-input-rename */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input } from '@angular/core';

@Component({
  selector: 'mk-workspace-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.scss'],
})
export class CheckBoxComponent {
  @Input() fieldObject: any;
  @Input() form: any;
  @Input('translatedProps') translatedProps!: any[];
  constructor() {
    /* TODO document why this constructor is empty */
  }
}
