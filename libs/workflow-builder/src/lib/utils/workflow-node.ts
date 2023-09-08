export interface WorkflowNode {
  nodeType?: NodeType;
  nodeName?: string;
  nodeUuid?: string;
  nodeTrueCond?: string;
  nodeFalseCond?: string;
  nodeDetails?: {};
  nodeNext?: string;
  nodeLoc?: string;
  nodeKey?: string;
}
export enum NodeType {
  rule = 'rule',
  step = 'step',
  start = 'start',
  stop = 'stop',
}
