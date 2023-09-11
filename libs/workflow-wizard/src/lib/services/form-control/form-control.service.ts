import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FieldObject } from '../../models/field-object';

@Injectable({
  providedIn: 'root',
})
export class FormControlService {
  constructor() {}

  toFormGroup(fObjects: FieldObject<string>[]) {
    const group: any = {};

    fObjects.forEach((fObj) => {
      group[fObj.key] = fObj.required
        ? fObj.regex !== ''
          ? new FormControl(fObj.value || '', [
              Validators.required,
              Validators.pattern(fObj.regex),
            ])
          : new FormControl(fObj.value || '', Validators.required)
        : new FormControl(fObj.value || '');
    });
    return new FormGroup(group);
  }
}
