/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'mk-workspace-rule-builder',
  templateUrl: './rule-builder.component.html',
  styleUrls: ['./rule-builder.component.scss'],
})
export class RuleBuilderComponent {
  @Output() saveRule = new EventEmitter<any>();
  @Input() isAddRule!: boolean;
  @Input() categoryList: any[] = [];
  @Input() isWizard: boolean = false;
  @Input() wizardSteps: any[] = [];
  @Input() ruleJson: any;
  @Input() parentType: string = '';
  isSubmitted: boolean = false;
  ruleForm!: FormGroup;
  ruleObject: any = {};
  ruleArray!: FormArray;
  queryCondition = 'AND';
  lookupList: any[] = [];
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
  constructor(private formBuilder: FormBuilder) {}
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
}
