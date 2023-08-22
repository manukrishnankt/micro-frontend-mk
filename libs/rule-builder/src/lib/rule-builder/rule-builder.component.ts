/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'mk-workspace-rule-builder',
  templateUrl: './rule-builder.component.html',
  styleUrls: ['./rule-builder.component.scss'],
})
export class RuleBuilderComponent {
  isSubmitted: boolean = false;
  ruleForm!: FormGroup;
  ruleObject: any = {};
  ruleArray!: FormArray;
  queryCondition = 'AND';
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
