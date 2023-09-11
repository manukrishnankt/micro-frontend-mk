import { GlobalConstants } from 'src/app/global-constants';
import { FieldObject } from '../field-object';

export class DropDownObject extends FieldObject<string> {
  override controlType = GlobalConstants.FIELD_TYPE_DROP_DOWN;
}
