/* eslint-disable @angular-eslint/no-input-rename */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ElementRef, Input } from '@angular/core';
import * as moment from 'moment';
import { FieldObject } from '../../../models/field-object';
import { Constants } from '../../../shared/constants';

@Component({
  selector: 'mk-workspace-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.scss'],
})
export class TextBoxComponent {
  @Input() fieldObject!: FieldObject<string>;
  @Input() form: any;
  @Input('translatedProps') translatedProps!: any[];
  textboxHeight: boolean = false;
  constructor(private elem: ElementRef) {}
  public get getMinimumProps() {
    const formValues = this.form.value;
    let minimumProperty = null;
    const fieldName: any = this.fieldObject.relatedFieldName;
    const relation = this.fieldObject.relatedRelation;
    let nameLength = this.fieldObject.label.length;

    if (nameLength > 60) {
      nameLength = nameLength / 45;
      nameLength = Math.trunc(nameLength);
      const heights = 60 + 10 * (nameLength - 1);
      const height = heights.toString();

      const paddings = 12 + 4 * (nameLength - 1);
      const padding = paddings.toString() + 'px';
      this.elem.nativeElement.style.setProperty('--height', height);
      this.elem.nativeElement.style.setProperty('--padding', padding);
      this.textboxHeight = true;
    }
    if (
      this.fieldObject.crossFieldEnabled &&
      fieldName !== 'CURRENT_DATE' &&
      formValues[fieldName] &&
      (relation === 'GT' || relation === 'GTE')
    ) {
      const crossFieldValue = formValues[fieldName];
      const dateObject = this.conditionMinimumCheckForValue(crossFieldValue);
      minimumProperty = moment(dateObject).format(Constants.STANDARD_DATE);
    } else if (
      this.fieldObject.crossFieldEnabled &&
      fieldName === 'CURRENT_DATE' &&
      (relation === 'GT' || relation === 'GTE')
    ) {
      minimumProperty = this.getMinimumCurrentDateProps();
    }
    return minimumProperty;
  }
  public get getMaximumProps() {
    const formValues = this.form.value;
    let maximumProperty = null;
    const fieldName: any = this.fieldObject.relatedFieldName;
    const relation = this.fieldObject.relatedRelation;
    if (
      this.fieldObject.crossFieldEnabled &&
      fieldName !== 'CURRENT_DATE' &&
      formValues[fieldName] &&
      (relation === 'LT' || relation === 'LTE')
    ) {
      const crossFieldValue = formValues[fieldName];
      const dateObject = this.conditionMaxmumCheckForValue(crossFieldValue);
      maximumProperty = moment(dateObject).format(Constants.STANDARD_DATE);
    } else if (
      this.fieldObject.crossFieldEnabled &&
      fieldName === 'CURRENT_DATE' &&
      (relation === 'LT' || relation === 'LTE')
    ) {
      maximumProperty = this.getMaximumCurrentDateProps();
    }
    return maximumProperty;
  }
  conditionMinimumCheckForValue(crossFieldValue: any) {
    const newDate = new Date(crossFieldValue);
    if (this.fieldObject.relatedRelation === 'GT') {
      newDate.setDate(newDate.getDate() + 1);
    }
    return newDate;
  }
  conditionMaxmumCheckForValue(crossFieldValue: any) {
    const newDate = new Date(crossFieldValue);
    if (this.fieldObject.relatedRelation === 'LT') {
      newDate.setDate(newDate.getDate() - 1);
    }
    return newDate;
  }
  getMaximumCurrentDateProps(): any {
    const newDate = new Date();
    if (this.fieldObject.relatedRelation === 'LT') {
      newDate.setDate(newDate.getDate() - 1);
    }
    return moment(newDate).format(Constants.STANDARD_DATE);
  }
  getMinimumCurrentDateProps(): any {
    const newDate = new Date();
    if (this.fieldObject.relatedRelation === 'GT') {
      newDate.setDate(newDate.getDate() + 1);
    }
    return moment(newDate).format(Constants.STANDARD_DATE);
  }
}
