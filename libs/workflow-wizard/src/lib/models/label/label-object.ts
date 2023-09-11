import { GlobalConstants } from 'src/app/global-constants';
import { FieldObject } from '../field-object';

export class LabelObject extends FieldObject<string> {
  override controlType = GlobalConstants.FIELD_TYPE_LABEL;
}
