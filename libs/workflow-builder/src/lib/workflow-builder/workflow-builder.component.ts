/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  FlowNodeType,
  FlowchartObj,
  LinkData,
  NodeData,
} from '../utils/flowchart-obj';
import { NodeType, WorkflowNode } from '../utils/workflow-node';
import { OpMode } from '../utils/workflow-enums';
declare let init: any;
declare let toJson: any;

@Component({
  selector: 'mk-workspace-workflow-builder',
  templateUrl: './workflow-builder.component.html',
  styleUrls: ['./workflow-builder.component.scss'],
})
export class WorkflowBuilderComponent implements OnInit {
  @ViewChild('divContent') divContent!: ElementRef;

  @Input() stepList: any[] = [];
  @Input() ruleList: any[] = [];
  @Input() workFlow: any[] = [];
  @Input() mode: string = OpMode.CREATE.toString();

  private nodeCheckList: any = [];
  private rulesArrayResp: any = [];

  initalizePallete() {
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
    return rulesUpdatedList;
  }
  toJson(): any {
    const data = toJson.apply();
    return JSON.parse(data);
  }

  convertToAPIFormat(): any[] {
    const nodeList: any = [];
    try {
      const canvasData = this.toJson();
      this.linkNodeDataToPayloadList(canvasData, nodeList);
      this.linkLinkDataToPayloadList(canvasData, nodeList);
      const stepsList: any[] = nodeList.filter(
        (ite: any) => ite.nodeType === 'step'
      );
      if (stepsList.length > 0) {
        const invalidSteps = stepsList.filter((ite) => !ite.nodeNext);
        if (invalidSteps.length > 0) {
          throw new Error(
            `Step "${invalidSteps[0].nodeName}" found with missing next node.`
          );
        }
      }
      const rulesList: any[] = nodeList.filter(
        (ite: any) => ite.nodeType === 'rule'
      );
      if (rulesList.length > 0) {
        const invalidRules = rulesList.filter(
          (ite) => !ite.nodeTrueCond || !ite.nodeFalseCond
        );
        if (invalidRules.length > 0) {
          throw new Error(
            `Rule "${invalidRules[0].nodeName}" found with missing true or false cases.`
          );
        }
      }
      return nodeList;
    } catch (e: any) {
      throw new Error(e);
    }
  }
  linkNodeDataToPayloadList(canvasData: any, nodeList: any[]) {
    canvasData.nodeDataArray.forEach((element: any) => {
      const nodeObj: WorkflowNode = {
        nodeKey: '',
        nodeFalseCond: '',
        nodeLoc: '',
        nodeName: '',
        nodeNext: '',
        nodeTrueCond: '',
        nodeType: NodeType.step,
        nodeUuid: '',
        nodeDetails: {},
      };
      nodeObj.nodeName = element.text;
      nodeObj.nodeKey = element.key;
      nodeObj.nodeLoc = element.loc;
      nodeObj.nodeUuid = element.uuid;
      nodeObj.nodeType = element.type;
      nodeList.push(nodeObj);
    });
  }
  linkLinkDataToPayloadList(canvasData: any, nodeList: any[]) {
    canvasData.linkDataArray.forEach((element: any) => {
      const fromList = this.attachRelation(nodeList, element.from);
      const toList = this.attachRelation(nodeList, element.to);

      if (element.text === undefined && this.isStep(element, nodeList)) {
        fromList[0].nodeNext = toList[0].nodeUuid;
      } else {
        if (
          element.text === undefined ||
          element.text.toLowerCase() === 'true'
        ) {
          fromList[0].nodeTrueCond = toList[0].nodeUuid;
        } else if (element.text.toLowerCase() === 'false') {
          fromList[0].nodeFalseCond = toList[0].nodeUuid;
        }
      }
    });
  }
  isStep(element: any, nodeList: any) {
    let found: boolean = false;
    const nd = nodeList.filter((s: any) => s.nodeKey === element.from);
    if (nd.length > 0) {
      if (
        nd[0].nodeType.toLowerCase() === 'step' ||
        nd[0].nodeType.toLowerCase() === 'start' ||
        nd[0].nodeType.toLowerCase() === 'stop'
      ) {
        found = true;
      }
    }
    return found;
  }
  attachRelation(nodeList: any, element: any) {
    const nd = nodeList.filter((s: any) => s.nodeKey === element);
    return nd;
  }
  convertToFlowFormat() {
    let hasNext: boolean = true;
    const flowObj: FlowchartObj = {
      linkDataArray: [],
      nodeDataArray: [],
      class: 'go.GraphLinksModel',
    };

    this.workFlow.forEach((element: any) => {
      const flowNodeData: NodeData = {
        category: '',
        uuid: '',
        key: 0,
        loc: '',
        text: '',
        figure: '',
        type: FlowNodeType.step,
      };
      if (element.wizWorkflowNodeType === 'start') {
        flowNodeData.category = 'Start';
      }
      if (element.wizWorkflowNodeType === 'stop') {
        flowNodeData.category = 'End';
      }
      flowNodeData.key = element.nodeKey;
      flowNodeData.type = element.wizWorkflowNodeType;
      flowNodeData.loc = element.nodeLoc;
      flowNodeData.text = element.nodeName;
      flowNodeData.uuid = element.wizWorkflowNodeId;
      if (element.wizWorkflowNodeType === 'rule') {
        flowNodeData.figure = 'Diamond';
      }
      const obj = {
        id: element.wizWorkflowNodeId,
        type: element.wizWorkflowNodeType,
        nextTraversed: false,
        trueTraversed: false,
        falseTraversed: false,
      };
      this.nodeCheckList.push(obj);
      flowObj.nodeDataArray?.push(flowNodeData);
    });

    const startNode = this.rulesArrayResp.filter(
      (s: any) => s.wizWorkflowNodeType === 'start'
    );
    if (startNode.length > 0) {
      const linkDataArray: LinkData = {
        from: startNode[0].nodeKey,
        to: 0,
      };

      let nextNode = this.getNextNodeDetails(
        startNode[0].wizWorkflowNextNodeID
      );
      if (nextNode?.length > 0) {
        this.updateNodeCheckList(startNode[0].wizWorkflowNodeId, '');
        linkDataArray.to = nextNode[0].nodeKey;
        flowObj.linkDataArray?.push(linkDataArray);
        let redType: any = 'trueCond';
        let breakLoop: number = 0;
        while (hasNext) {
          breakLoop++;
          if (nextNode.length === 0) {
            const nxnd: any = [];
            const nxtObj = this.checkTravesing(flowObj.linkDataArray);
            if (nxtObj !== undefined) {
              nxnd.push(nxtObj);
              nextNode = nxnd;
            } else {
              hasNext = false;
            }
          } else {
            if (!this.checkCheckList(nextNode)) {
              const linkDataArray2: LinkData = {
                from: nextNode[0].nodeKey,
                to: 0,
              };

              const nxtNode = this.loopThroughNodes(nextNode[0], redType);
              if (nxtNode?.length > 0) {
                this.updateNodeCheckList(
                  nextNode[0].wizWorkflowNodeId,
                  redType
                );
                linkDataArray2.to = nxtNode[0].nodeKey;
                if (nextNode[0].wizWorkflowNodeType.toLowerCase() === 'rule') {
                  if (redType === 'trueCond') {
                    linkDataArray2.text = 'True';
                    linkDataArray2.visible = true;
                  } else {
                    linkDataArray2.text = 'False';
                    linkDataArray2.visible = true;
                  }
                }

                flowObj.linkDataArray?.push(linkDataArray2);
                if (
                  nextNode[0].wizWorkflowNodeType.toLowerCase() === 'rule' &&
                  redType === 'trueCond'
                ) {
                  redType = 'falseCond';
                } else {
                  nextNode = nxtNode;
                  redType = 'trueCond';
                }
              } else {
                const nxnd: any = [];
                const nxtObj = this.checkTravesing(flowObj.linkDataArray);
                if (nxtObj !== undefined) {
                  nxnd.push(nxtObj);
                  nextNode = nxnd;
                } else {
                  hasNext = false;
                }
              }
            } else {
              nextNode = this.loopThroughNodes(nextNode[0], redType);
            }
          }
          if (breakLoop >= 3000) {
            hasNext = false;
          }
        }
      }
    }
    setTimeout(() => {
      /*
      this.origFlowObj = JSON.parse(JSON.stringify(flowObj));
      new init(flowObj, this.ruleStepList);
      */
    }, 1000);
  }
  updateNodeCheckList(nodeId: any, traverseType: any) {
    this.nodeCheckList.forEach((element: any) => {
      if (element.id === nodeId) {
        if (
          element.type.toLowerCase() === 'step' ||
          element.type.toLowerCase() === 'start' ||
          element.type.toLowerCase() === 'stop'
        ) {
          element.nextTraversed = true;
        } else {
          if (traverseType === 'trueCond') {
            element.trueTraversed = true;
          } else {
            element.falseTraversed = true;
          }
        }
      }
    });
  }

  loopThroughNodes(node: any, redType: any) {
    if (node.wizWorkflowNodeType === 'step') {
      const nextNode = this.getNextNodeDetails(node.wizWorkflowNextNodeID);
      return nextNode;
    } else if (node.wizWorkflowNodeType === 'rule') {
      let trueNextNode;
      if (redType === 'trueCond') {
        trueNextNode = this.getNextNodeDetails(node.wizWorkflowTrueNextId);
      } else {
        trueNextNode = this.getNextNodeDetails(node.wizWorkflowFalseNextId);
      }

      return trueNextNode;
    }
  }

  getNextNodeDetails(id: any) {
    const nextNode = this.rulesArrayResp.filter(
      (s: any) => s.wizWorkflowNodeId === id
    );
    return nextNode;
  }
  checkTravesing(flowObj: any) {
    const filtered = this.rulesArrayResp.filter((obj: any) => {
      const found = this.checkLinkPresent(obj, flowObj);
      return !found && obj.wizWorkflowNodeType !== 'stop';
    });
    return filtered?.[0];
  }
  checkLinkPresent(nodeObj: any, flowObj: any) {
    return (
      flowObj.filter((obj: any) => {
        return obj.from === nodeObj.nodeKey;
      }).length > 0
    );
  }
  ngOnInit(): void {
    if (this.mode === OpMode.CREATE.toString()) {
      const flowObj: FlowchartObj = {
        linkDataArray: [],
        nodeDataArray: [],
        class: 'go.GraphLinksModel',
      };
      const rulesUpdatedList = this.initalizePallete();
      new init(flowObj, rulesUpdatedList);
    }
  }
  /**this checks the checklist to remove duplicate cheking */
  checkCheckList(node: any) {
    let found = false;
    const findNode = this.nodeCheckList.filter(
      (s: any) => s.id === node[0].wizWorkflowNodeId
    );
    if (findNode.length > 0) {
      if (
        (findNode[0].type.toLowerCase() === 'rule' &&
          findNode[0].trueTraversed &&
          findNode[0].falseTraversed) ||
        ((findNode[0].type.toLowerCase() === 'step' ||
          findNode[0].type.toLowerCase() === 'start' ||
          findNode[0].type.toLowerCase() === 'stop') &&
          findNode[0].nextTraversed)
      ) {
        found = true;
      }
    }
    return found;
  }
}
