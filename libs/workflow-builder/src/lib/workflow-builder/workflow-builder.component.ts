/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
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
export class WorkflowBuilderComponent implements AfterViewInit {
  @ViewChild('divContent') divContent!: ElementRef;

  @Input() ruleStepList: any[] = [];

  ngAfterViewInit(): void {
    const flowObj: FlowchartObj = {
      linkDataArray: [],
      nodeDataArray: [],
      class: 'go.GraphLinksModel',
    };
    new init(flowObj, this.ruleStepList);
  }
}
