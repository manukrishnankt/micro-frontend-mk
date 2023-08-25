/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Criteria, RuleOutputObj } from '../../../shared/rule-op-obj';

@Component({
  selector: 'mk-workspace-rule-container',
  templateUrl: './rule-container.component.html',
  styleUrls: ['./rule-container.component.scss'],
})
export class RuleContainerComponent implements OnInit {
  @Output() saveRule = new EventEmitter<any>();
  @Input() isAddRule!: boolean;
  @Input() categoryList: any[] = [];
  @Input() wizardSteps: any[] = [];
  @Input() ruleJson: any;
  @Input() lookupList: any[] = [];
  isSubmitted: boolean = false;
  ruleForm!: FormGroup;
  ruleObject: any = {};
  ruleArray!: FormArray;
  queryCondition = 'AND';
  operatorList: any[] = [
    { key: 'EQUALS', value: 'EQUALS', type: ['STRING', 'NUMBER'] },
    { key: 'NOT_EQUALS', value: 'NOT EQUALS', type: ['STRING', 'NUMBER'] },
    { key: 'GREATER_THAN', value: 'GREATER THAN', type: ['NUMBER'] },
    { key: 'LESS_THAN', value: 'LESS THAN', type: ['NUMBER'] },
    { key: 'STARTS_WITH', value: 'STARTS WITH', type: ['STRING'] },
    { key: 'CONTAINS', value: 'CONTAINS', type: ['STRING'] },
    { key: 'NOT_CONTAINS', value: 'DOES NOT CONTAIN', type: ['STRING'] },
    {
      key: 'GREATER_THAN_EQUAL',
      value: 'GREATER THAN OR EQUAL',
      type: ['NUMBER'],
    },
    { key: 'LESS_THAN_EQUAL', value: 'LESS THAN OR EQUAL', type: ['NUMBER'] },
    { key: 'DATE_GT', value: 'DATE GREATER THAN', type: ['DATE'] },
    { key: 'DATE_LT', value: 'DATE LESS THAN', type: ['DATE'] },
    { key: 'DATE_EQUAL', value: 'DATE EQUAL', type: ['DATE'] },
    { key: 'MVEL', value: 'MVEL', type: ['STRING'] },
  ];

  criteriaObj: Criteria = {
    criteria: {
      logicalOperators: [''],
      expressionObjects: [
        {
          fieldName: '',
          operator: '',
          fieldValue: '',
          fieldType: '',
          fieldDataTypeUI: 'TEXT',
          fieldLookupCodeUI: '',
        },
      ],
    },
  };

  opObj: RuleOutputObj = {
    ruleName: '',
    ruleDescription: '',
    ruleJson: {
      logicalOperators: [''],
      expressionObjects: [
        {
          fieldName: '',
          operator: '',
          fieldValue: '',
          fieldType: 'STRING',
          fieldDataTypeUI: 'TEXT',
          fieldLookupCodeUI: '',
        },
      ],
      conditions: [this.criteriaObj],
    },
  };
  wizardStepsObj: any = { nodeTrueCond: '', nodeFalseCond: '' };

  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.ruleForm = this.createGroup();
    this.ruleArray = this.ruleForm.get('rules') as FormArray;
  }
  addRow(type: any): void {
    if (type === 0) {
      this.addGroup();
    } else {
      this.addCondition();
    }
  }

  private addCondition(): void {
    this.ruleArray.push(this.createRules());
    if (this.ruleArray.controls.length === 2) {
      this.ruleForm.patchValue({
        condition: this.queryCondition,
      });
    }
  }

  private addGroup(): void {
    this.ruleArray.push(this.createGroup());
    if (this.ruleArray.controls.length === 2) {
      this.ruleForm.patchValue({
        condition: this.queryCondition,
      });
    }
  }

  removeRow(i: number): void {
    this.ruleArray.removeAt(i);
    if (this.ruleArray.controls.length === 1) {
      this.queryCondition = this.ruleForm.value.condition;
      this.ruleForm.patchValue({
        condition: '',
      });
    }
  }
  private setRuleResponseBaseObj(): FormGroup {
    return this.formBuilder.group({
      logicalOperators: [],
      expressionObjects: [],
      groupName: 'Test',
      parentGroupName: '',
      parnetId: '1',
      ruleId: '1',
      conditions: [],
    });
  }
  createConditions(): FormGroup {
    return this.formBuilder.group({
      criteria: this.setRuleResponseBaseObj(),
    });
  }

  private createRules(): FormGroup {
    return this.formBuilder.group({
      fieldName: ['', Validators.required],
      operator: ['', Validators.required],
      fieldValue: ['', Validators.required],
      fieldType: ['STRING'],
      fieldDataTypeUI: ['TEXT'],
      fieldLookupCodeUI: [''],
    });
  }

  private createGroup(): FormGroup {
    return this.formBuilder.group({
      condition: 'AND',
      rules: this.formBuilder.array([this.createRules()]),
    });
  }
  onGenerateRule() {
    if (this.ruleForm.valid) {
      this.opObj = {
        ruleName: '',
        ruleDescription: '',
        ruleJson: {
          logicalOperators: [''],
          expressionObjects: [
            {
              fieldName: '',
              operator: '',
              fieldValue: '',
              fieldType: 'STRING',
              fieldDataTypeUI: 'TEXT',
              fieldLookupCodeUI: '',
            },
          ],
          conditions: [this.criteriaObj],
        },
      };
      const sampleJson = this.ruleForm.getRawValue();
      if (this.opObj.ruleJson?.logicalOperators?.length === 1) {
        this.opObj.ruleJson.logicalOperators[0] = sampleJson.condition;
      } else {
        this.opObj.ruleJson?.logicalOperators?.push(sampleJson.condition);
      }
      sampleJson.rules.forEach((element: any) => {
        this.returnRecursive(element, this.opObj.ruleJson);
      });

      this.ruleForm.reset();
      this.saveRule.emit({
        ruleJson: this.opObj,
        wizardObj: this.wizardStepsObj,
      });
    }
    return this.opObj;
  }
  returnRecursive(element: any, criteria: any) {
    if (element['condition']) {
      this.criteriaObj = {
        criteria: {
          logicalOperators: [''],
          expressionObjects: [
            {
              fieldName: '',
              operator: '',
              fieldValue: '',
              fieldType: 'STRING',
              fieldDataTypeUI: 'TEXT',
              fieldLookupCodeUI: '',
            },
          ],
        },
      };
      if (this.criteriaObj.criteria?.logicalOperators?.length === 1) {
        this.criteriaObj.criteria.logicalOperators[0] = element.condition;
      } else {
        this.criteriaObj.criteria?.logicalOperators?.push(element.condition);
      }
      if (criteria['conditions']) {
        criteria.conditions[0] = this.criteriaObj;
      } else {
        criteria['conditions'] = [];
        criteria.conditions[0] = this.criteriaObj;
      }

      element.rules.forEach((element2: any) => {
        this.returnRecursive(element2, criteria?.conditions[0].criteria);
      });
    } else {
      if (
        criteria?.expressionObjects.length === 1 &&
        criteria?.expressionObjects[0].fieldName === ''
      ) {
        criteria.expressionObjects[0].fieldName =
          element.fieldDataTypeUI == 'LOOKUP'
            ? element.fieldName + 'key'
            : element.fieldName;
        criteria.expressionObjects[0].fieldType = element.fieldType;
        criteria.expressionObjects[0].fieldValue = element.fieldValue;
        criteria.expressionObjects[0].operator = element.operator;
        criteria.expressionObjects[0].fieldDataTypeUI = element.fieldDataTypeUI;
        criteria.expressionObjects[0].fieldLookupCodeUI =
          element.fieldLookupCodeUI;
      } else {
        element.fieldName =
          element.fieldDataTypeUI == 'LOOKUP'
            ? element.fieldName + 'key'
            : element.fieldName;
        criteria?.expressionObjects?.push(element);
      }
    }
    return criteria;
  }
}
