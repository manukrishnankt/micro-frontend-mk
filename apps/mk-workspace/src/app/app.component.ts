/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';

@Component({
  selector: 'mk-workspace-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  stepList: any[] = [];
  ruleList: any[] = [];
  constructor() {
    this.stepList = [
      {
        displayLoabel: 'Step 1',
        uniqueId: '123',
      },
      {
        displayLoabel: 'Step 2',
        uniqueId: '1232',
      },
      {
        displayLoabel: 'Step 3',
        uniqueId: '1233',
      },
      {
        displayLoabel: 'Step 4',
        uniqueId: '1234',
      },
      {
        displayLoabel: 'Step 5',
        uniqueId: '122',
      },
      {
        displayLoabel: 'Step 7',
        uniqueId: '231',
      },
    ];
    this.ruleList = [
      {
        displayLoabel: 'Rule 1',
        uniqueId: '123',
      },
      {
        displayLoabel: 'Rule 2',
        uniqueId: '122',
      },
      {
        displayLoabel: 'Rule 3',
        uniqueId: '333',
      },
    ];
  }
}
