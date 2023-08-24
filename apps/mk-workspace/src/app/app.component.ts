/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';

@Component({
  selector: 'mk-workspace-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'NX Workspace';
  categoryList: any[] = [
    { fieldName: 'firstName', fieldLabel: 'First Name', fieldType: 'STRING' },
  ];
  lookupList: any[] = [{ lookUpCatCode: '1Code', categoryText: 'Look Up 1' }];
}
