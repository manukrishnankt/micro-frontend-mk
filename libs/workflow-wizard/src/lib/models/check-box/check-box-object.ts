import { GlobalConstants } from 'src/app/global-constants';
import { FieldObject } from '../field-object';

export class CheckBoxObject extends FieldObject<string> {
  override controlType = GlobalConstants.FIELD_TYPE_CHECKBOX;
}
