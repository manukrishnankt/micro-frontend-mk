export interface FlowchartObj {
  class?: string;
  nodeDataArray?: Array<nodeData>;
  linkDataArray?: Array<linkData>;
}
export interface nodeData {
  category?: string;
  uuid?: string;
  text?: string;
  type?: flowNodeType;
  key?: number;
  loc?: string;
  figure?: string;
}
export interface linkData {
  from?: number;
  to?: number;
  text?: string;
  visible?: boolean;
}
export enum flowNodeType {
  rule = 'rule',
  step = 'step',
  start = 'start',
  stop = 'stop',
}
