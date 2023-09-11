/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/no-output-on-prefix */
/* eslint-disable @angular-eslint/no-input-rename */
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'mk-workspace-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.scss'],
})
export class DropDownComponent implements AfterViewInit {
  @Input() fieldObject: any;
  @Input() form: any;
  @Input('translatedProps') translatedProps!: any[];
  @Input('wizardCommonLangProperties') wizardCommonLangProperties!: any;
  @Output() onApiEnabledFieldSelection: EventEmitter<any> = new EventEmitter();
  ngAfterViewInit(): void {
    this.loadPreloadInfo();
  }
  loadPreloadInfo() {
    if (this.fieldObject.apiEnabled) {
      this.onApiEnabledFieldSelection.emit({ preload: true });
    }
  }
  compareFn(c1: any, c2: any) {
    return c1.value === c2.value;
  }
  onChangeValueForAPICheck(eveObj: any) {
    if (this.fieldObject.apiEnabled && eveObj) {
      this.onApiEnabledFieldSelection.emit({ preload: true });
    }
  }
}
