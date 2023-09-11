import { GlobalConstants } from '../../shared/global-constants';
import { FieldObject } from '../field-object';

export class RadioButtonObject extends FieldObject<string> {
  override controlType = GlobalConstants.FIELD_TYPE_RADIO;
  radioList = [];
}
