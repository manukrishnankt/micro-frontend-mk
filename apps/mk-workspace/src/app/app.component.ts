/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';

@Component({
  selector: 'mk-workspace-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  ruleStepList: any[] = [];
  constructor() {
    this.ruleStepList = [
      {
        category: 'Start',
        text: 'Start',
        type: 'start',
        uuid: '10000',
      },
      {
        category: 'End',
        text: 'End',
        type: 'stop',
        uuid: '999999',
      },
    ];
  }
}
