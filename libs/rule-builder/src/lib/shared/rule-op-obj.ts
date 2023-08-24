export interface RuleOutputObj {
  createdDate?: string;
  createdBy?: string;
  modifiedDate?: string;
  modifiedBy?: string;
  isActive?: number;
  ruleName?: string;
  ruleDescription?: string;
  scheduleInterval?:string;
  ruleJson?: RuleObj;
  isDeleted?: boolean;
  ruleType?: string;
}
export interface Criteria {
  criteria?: RuleObj;
}
export interface RuleObj {
  logicalOperators?: [string];
  expressionObjects?: [ExpressionObjects];
  groupName?: string;
  parentGroupName?: string;
  parnetId?: string;
  ruleId?: string;
  conditions?: [Criteria];
}
export interface ExpressionObjects {
  fieldName?: string;
  operator?: string;
  fieldValue?: string;
  fieldType?: string;
  fieldDataTypeUI?: string;
  fieldLookupCodeUI?: string;
  removable?:boolean;
}
