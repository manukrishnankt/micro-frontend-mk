/* eslint-disable @typescript-eslint/no-explicit-any */
export class FieldObject<T> {
  value: T | undefined;
  key: string;
  label: string;
  regex: string;
  hint: string;
  required: boolean;
  order: number;
  controlType: string;
  type: string;
  options: { key: string; value: string }[];
  validators: any[] | undefined;
  labelKey: string | undefined;
  labelValue: string | undefined;
  apiEnabled: boolean | undefined;
  apiEnableBy: string | undefined;
  crossFieldEnabled: boolean | undefined;
  relatedFieldName: string | undefined;
  relatedRelation: string | undefined;
  constructor(
    options: {
      value?: T;
      key?: string;
      label?: string;
      regex?: string;
      hint?: string;
      required?: boolean;
      order?: number;
      controlType?: string;
      type?: string;
      options?: { key: string; value: string }[];
      validators?: any[];
      labelKey?: string;
      labelValue?: string;
      apiEnableBy?: string;
      apiEnabled?: boolean;
      crossFieldEnabled?: boolean;
      relatedFieldName?: string;
      relatedRelation?: string;
    } = {}
  ) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.regex = options.regex || '';
    this.hint = options.hint || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.type = options.type || '';
    this.options = options.options || [];
    this.validators = options.validators;
    this.labelKey = options.labelKey;
    this.labelValue = options.labelValue;
    this.apiEnableBy = options.apiEnableBy;
    this.apiEnabled = options.apiEnabled;
    this.crossFieldEnabled = options.crossFieldEnabled;
    this.relatedFieldName = options.relatedFieldName;
    this.relatedRelation = options.relatedRelation;
  }
}
