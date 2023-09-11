import { GlobalConstants } from '../../shared/global-constants';
import { FieldObject } from '../field-object';

export class TextBoxObject extends FieldObject<string> {
  override controlType = GlobalConstants.FIELD_TYPE_TEXT_BOX;
}
