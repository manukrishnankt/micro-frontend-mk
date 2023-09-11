/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @angular-eslint/no-output-on-prefix */
/* eslint-disable @angular-eslint/no-input-rename */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldObject } from '../../models/field-object';
import { FormControlService } from '../../services/form-control/form-control.service';

@Component({
  selector: 'mk-workspace-dynamic-form-wrapper',
  templateUrl: './dynamic-form-wrapper.component.html',
  styleUrls: ['./dynamic-form-wrapper.component.scss'],
})
export class DynamicFormWrapperComponent implements OnInit, OnChanges {
  @Input() fieldsList: any;
  fieldObjects: FieldObject<string>[] | null = [];
  @Input() stepDetails: any;
  @Input('formType') formType!: string;
  @Input('stepFormValue') stepFormValue!: any;
  @Input('sectionDetail') sectionDetail!: any;
  @Output() onSubmitBtnClickEmit: EventEmitter<any> = new EventEmitter();
  @Input('sectionIndx') sectionIndx!: number;
  @Input('tabIndex') tabIndx!: number;
  @Input('translatedProps') translatedProps!: any[];
  @Input('wizardCommonLangProperties') wizardCommonLangProperties!: any;
  form!: FormGroup;
  formSubmitted!: boolean;
  constructor(private qcs: FormControlService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.loadForm();
  }

  ngOnInit() {
    this.loadForm();
  }
  loadForm() {
    let hiddenFieldsIfAny: any;
    this.fieldObjects = this.fieldsList.map((ite: any, i: number) => {
      let valueFIeld: any = '';
      if (
        ite.wizFieldType === 'HIDDEN' &&
        ite.pickupList &&
        ite.pickupList.length
      ) {
        if (ite.pickupList[0].pickupId === 0) {
          valueFIeld = ite.pickupList[0].value;
        } else {
          valueFIeld = ite.pickupList[0].key;
        }
        if (hiddenFieldsIfAny) {
          hiddenFieldsIfAny[ite.wizFieldName] = valueFIeld;
        } else {
          hiddenFieldsIfAny = {};
          hiddenFieldsIfAny[ite.wizFieldName] = valueFIeld;
        }
      }
      const optionsObj: any = {
        value: valueFIeld,
        key: ite.wizFieldName,
        label: ite.wizFieldLabel,
        regex:
          ite.wizFieldValidationRegx && ite.wizFieldDefRegx
            ? ite.wizFieldValidationRegx
            : '',
        hint: ite.wizFieldDescription,
        required: ite.wizFieldRequired,
        order: i,
        controlType: ite.wizFieldType,
        type: ite.wizFieldDataType,
        options: ite.pickupList,
        validators: ite.wizFieldValidation,
        labelKey: ite.wizFieldLabelKey,
        labelValue: ite.wizFieldLabelValue,
        apiEnabled: ite.wizFieldApiEnabledYN,
        apiEnableBy: ite.wizFieldApiFieldKey,
        crossFieldEnabled: ite.wizFieldCrossFeildYN,
        relatedRelation: ite.wizFieldCrossFieldRelation,
        relatedFieldName: ite.wizFieldCrossField,
      };
      return new FieldObject(optionsObj);
    });
    this.form = this.qcs.toFormGroup(
      this.fieldObjects as FieldObject<string>[]
    );

    if (this.stepFormValue) {
      if (this.sectionDetail.wizStepSecType === 'TAB_GROUP') {
        this.setTabFormValues();
      } else {
        this.form.patchValue(this.stepFormValue);
        if (hiddenFieldsIfAny) {
          this.form.patchValue(hiddenFieldsIfAny);
        }
      }
    }
  }
  setTabFormValues() {
    if (this.stepFormValue) {
      this.form.patchValue(this.stepFormValue[this.tabIndx]);
    }
  }
  onSubmit() {
    this.formSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const rawValue = {
      data: this.form.getRawValue(),
      sectionDetail: this.sectionDetail,
      sectionIndx: this.sectionIndx,
      tabIndx: this.tabIndx,
    };
    this.onSubmitBtnClickEmit.emit(rawValue);
  }
  onApiEnabledFieldSelection(eventObj: any, fieldItem: any) {
    if (fieldItem.apiEnabled) {
      const formValue = this.form.value;
      if (formValue[fieldItem.apiEnableBy]) {
        this.fetchChildLookups(formValue[fieldItem.apiEnableBy].key, fieldItem);
      } else {
        if (!eventObj.preload) {
          throw new Error('Invalid Configuration or value is missing.');
        }
      }
    }
  }
  fetchChildLookups(lookUpCode: any, fieldItem: any) {
    // fetchFromParentLogic
  }
  public getCurrentFormValue() {
    return this.form.value;
  }
}
