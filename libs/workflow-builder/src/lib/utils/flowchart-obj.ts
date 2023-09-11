export interface FlowchartObj {
  class?: string;
  nodeDataArray?: Array<NodeData>;
  linkDataArray?: Array<LinkData>;
}
export interface NodeData {
  category?: string;
  uuid?: string;
  text?: string;
  type?: FlowNodeType;
  key?: number;
  loc?: string;
  figure?: string;
}
export interface LinkData {
  from?: number;
  to?: number;
  text?: string;
  visible?: boolean;
}
export enum FlowNodeType {
  rule = 'rule',
  step = 'step',
  start = 'start',
  stop = 'stop',
}
