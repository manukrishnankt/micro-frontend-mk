import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { FieldObject } from '../../models/field-object';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent {
  @Input() fieldObject!: FieldObject<string>;
  @Input() form!: FormGroup;
  @Input('formSubmitted') formSubmitted!: boolean | undefined;
  @Input('translatedProps') translatedProps!: any[];
  @Input('wizardCommonLangProperties') wizardCommonLangProperties!: any;
  @Output() onApiEnabledFieldSelEmit: EventEmitter<any> = new EventEmitter();
  get isValid() {
    return this.form.controls[this.fieldObject.key].valid;
  }
  onApiEnabledFieldSelection(eventObj: any) {
    this.onApiEnabledFieldSelEmit.emit(eventObj);
  }
}
