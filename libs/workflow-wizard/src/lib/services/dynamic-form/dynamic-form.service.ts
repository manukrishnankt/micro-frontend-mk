import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { CheckBoxObject } from '../../models/check-box/check-box-object';
import { DropDownObject } from '../../models/drop-down/drop-down-object';
import { FieldObject } from '../../models/field-object';
import { LabelObject } from '../../models/label/label-object';
import { RadioButtonObject } from '../../models/radio-button/radio-button-object';
import { TextAreaObject } from '../../models/text-area/text-area-object';
import { TextBoxObject } from '../../models/text-box/text-box-object';

@Injectable({
  providedIn: 'root',
})
export class DynamicFormService {
  constructor() {
    /* TODO document why this constructor is empty */
  }

  //  get from a remote source of metadata
  getFields() {
    const questions: FieldObject<string>[] = [
      new DropDownObject({
        key: 'brave',
        label: 'Bravery Rating',
        hint: 'this is a hint',
        options: [
          { key: 'solid', value: 'Solid' },
          { key: 'great', value: 'Great' },
          { key: 'good', value: 'Good' },
          { key: 'unproven', value: 'Unproven' },
        ],
        order: 3,
      }),

      new TextBoxObject({
        key: 'firstName',
        label: 'First name',
        hint: 'this is a hint',
        value: 'Bombasto',
        required: true,
        regex: '^[a-z0-9_-]{8,15}$',
        order: 1,
      }),

      new TextBoxObject({
        key: 'emailAddress',
        hint: 'this is a hint',
        label: 'Email',
        type: 'email',
        order: 2,
      }),
      new CheckBoxObject({
        key: 'privacy',
        hint: 'this is a hint',
        label: 'Privacy Policy',
        type: 'checkbox',
        order: 4,
      }),
      new TextAreaObject({
        key: 'address',
        hint: 'this is a hint',
        label: 'Address',
        type: 'checkbox',
        order: 5,
      }),
      new RadioButtonObject({
        key: 'gender',
        hint: 'this is a hint',
        label: 'Gender',
        type: 'checkbox',
        required: true,
        order: 6,
        options: [
          { value: 'India - Kochi', key: 'indkochi' },
          { value: 'India - Tvm', key: 'indtvm' },
          { value: 'India - Kannur', key: 'indknr' },
          { value: 'India - Tcr', key: 'indtcr' },
          { value: 'India - Coimbatur', key: 'indcoimb' },
          { value: 'India - Kolkatta', key: 'indkol' },
        ],
      }),
      new LabelObject({
        label: 'This is the list of OFC centers in India',
        type: 'label',
        order: 7,
      }),
    ];
    return of(questions.sort((a, b) => a.order - b.order));
  }
}
