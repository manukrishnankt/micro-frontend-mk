/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FlowchartObj } from '../utils/flowchart-obj';
declare var init: any;
declare var toJson: any;

@Component({
  selector: 'mk-workspace-workflow-builder',
  templateUrl: './workflow-builder.component.html',
  styleUrls: ['./workflow-builder.component.scss'],
})
export class WorkflowBuilderComponent implements OnChanges {
  @ViewChild('divContent') divContent!: ElementRef;

  @Input() stepList: any[] = [];
  @Input() ruleList: any[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    const flowObj: FlowchartObj = {
      linkDataArray: [],
      nodeDataArray: [],
      class: 'go.GraphLinksModel',
    };
    const rulesUpdatedList: any[] = [
      {
        category: 'Start',
        text: 'Start',
        type: 'start',
        uuid: '10000',
      },
    ];
    this.stepList.forEach((element: any) => {
      rulesUpdatedList.push({
        text: element.displayLoabel,
        uuid: 'STEP_' + element.uniqueId,
        type: 'step',
      });
    });
    this.ruleList.forEach((element: any) => {
      rulesUpdatedList.push({
        text: element.displayLoabel,
        uuid: 'RULE_' + element.uniqueId,
        type: 'rule',
        figure: 'Diamond',
      });
    });
    rulesUpdatedList.push({
      category: 'End',
      text: 'End',
      type: 'stop',
      uuid: '999999',
    });
    new init(flowObj, rulesUpdatedList);
  }
}
