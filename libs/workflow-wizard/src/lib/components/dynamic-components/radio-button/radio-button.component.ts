/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/no-input-rename */
import { AfterViewInit, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'mk-workspace-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
})
export class RadioButtonComponent implements AfterViewInit {
  @Input() fieldObject: any;
  @Input() form!: FormGroup;
  @Input('translatedProps') translatedProps!: any[];
  defaultValue!: any;
  showButtonsYN!: boolean;
  public checkFunction(controlName: any, object: any) {
    const status = this.form.value[controlName].key === object.key;
    return status;
  }
  public get formValues() {
    return this.form.value;
  }
  checkByForce(id: any) {
    return this.formValues[this.fieldObject.key].key === id;
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.showButtonsYN = true;
    }, 1200);
  }
}
