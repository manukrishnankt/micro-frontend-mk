/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input } from '@angular/core';

@Component({
  selector: 'mk-workspace-hidden-field',
  templateUrl: './hidden-field.component.html',
  styleUrls: ['./hidden-field.component.scss'],
})
export class HiddenFieldComponent {
  @Input() fieldObject: any;
  @Input() form: any;
  constructor() {
    /* TODO document why this constructor is empty */
  }
}
