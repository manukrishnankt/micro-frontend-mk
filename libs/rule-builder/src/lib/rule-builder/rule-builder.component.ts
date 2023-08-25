/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'mk-workspace-rule-builder',
  templateUrl: './rule-builder.component.html',
  styleUrls: ['./rule-builder.component.scss'],
})
export class RuleBuilderComponent {
  ruleArray!: FormArray;
  ruleForm!: FormGroup;
  @Input() categoryList: any[] = [];
  @Input() lookupList: any[] = [];
  @Input() ruleShowYN: boolean = false;
  constructor(private formBuilder: FormBuilder) {
    this.ruleForm = this.createGroup();

    this.ruleArray = this.ruleForm.get('rules') as FormArray;
  }
  createGroup(): FormGroup<any> {
    return this.formBuilder.group({
      condition: 'AND',

      rules: this.formBuilder.array([this.createRules()]),
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
}
