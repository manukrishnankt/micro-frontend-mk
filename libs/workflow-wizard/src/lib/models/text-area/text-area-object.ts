import { GlobalConstants } from 'src/app/global-constants';
import { FieldObject } from '../field-object';

export class TextAreaObject extends FieldObject<string> {
  override controlType = GlobalConstants.FIELD_TYPE_TEXT_AREA;
}
