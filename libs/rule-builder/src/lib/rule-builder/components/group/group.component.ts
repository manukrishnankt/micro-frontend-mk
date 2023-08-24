/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'mk-workspace-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent implements OnInit {
  @Input() rule!: any;
  @Input() gLength!: any;
  @Input() operatorList!: any[];
  @Input() categoryList!: any[];
  @Input() lookupList!: any[];
  @Input() isSubmitted!: boolean;
  @Input() arrayLength: boolean = false;
  @Input() isWizardRule: boolean = false;
  @Input() parentType!: string;

  @Output() deleteGroup: EventEmitter<number> = new EventEmitter<number>();

  @ViewChild('fieldValue', { static: false })
  queryCondition = 'AND';
  ruleArray!: FormArray;
  valueList: any[] = [];
  valueTypes = ['TEXT', 'DATE', 'LOOKUP'];
  lookupValueList: any[] = [];
  selectedLookupValue: any;
  lookupValueListArray: any[] = [];
  ruleFieldListArray: any[] = [];
  rulePreValueListArray: any[] = [];
  dialogRef: any;
  concatValue: string = '';
  showMenu: boolean = false;
  concatValueNew: string = '';
  myTextBox!: HTMLInputElement;
  currentCursorPosition: any;
  fieldValue!: ElementRef<HTMLTextAreaElement>;
  cursorPosition: any;
  caretPos: any;
  changedValue: any;
  caretEnd: any;
  modifiedValue: any;
  constructor(private formBuilder: FormBuilder, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.ruleArray = this.rule.get('rules') as FormArray;
  }
  getCaretPos(oField: any) {
    this.changedValue = oField.value;
    if (oField.selectionStart || oField.selectionStart == '0') {
      this.caretPos = oField.selectionStart;
      this.caretEnd = oField.selectionEnd;
    }
  }

  ruleExpField(event: any, value: any) {
    if (this.caretPos == 1) {
      this.changedValue = '';
      this.modifiedValue = '';
      this.concatValueNew = '';
    }
    if (this.changedValue != undefined) {
      this.concatValueNew = value.lookUpCdtCode;

      this.modifiedValue =
        this.changedValue.slice(0, this.caretPos) +
        this.concatValueNew +
        this.changedValue?.slice(this.caretEnd);
      this.changedValue = this.modifiedValue;
    } else {
      this.concatValueNew = this.concatValue + ' ' + value.lookUpCdtCode;

      this.modifiedValue = this.concatValueNew;
      this.concatValue = this.concatValueNew;
    }
    this.rule.patchValue({
      fieldValue: this.modifiedValue,
    });

    event.stopPropagation();
  }

  /* output event triggering when click addcondition or add group from action bar component */
  addRow(type: number): void {
    if (type === 0) {
      this.addGroup();
    } else {
      this.addCondition();
    }
  }

  /* add condition to rule fromarray*/
  private addCondition(): void {
    this.ruleArray.push(this.createRules());
    this.gLength = this.ruleArray.length;

    if (this.ruleArray.controls.length === 2) {
      this.rule.patchValue({
        condition: this.queryCondition,
      });
    }
  }

  /* add group to rule formarray*/
  private addGroup(): void {
    this.ruleArray.push(this.createGroup());

    if (this.ruleArray.controls.length === 2) {
      this.rule.patchValue({
        condition: this.queryCondition,
      });
    }
  }

  /* funtion returns 'group' formgroup*/
  private createGroup(): FormGroup {
    return this.formBuilder.group({
      condition: 'AND',
      // level,
      rules: this.formBuilder.array([this.createRules()]),
    });
  }

  /* funtion returns condition formgroup*/
  private createRules(): FormGroup {
    return this.formBuilder.group({
      fieldName: ['', Validators.required],
      operator: ['', Validators.required],
      fieldValue: ['', Validators.required],
      fieldType: ['STRING'],
      fieldDataTypeUI: ['TEXT'],
      fieldLookupCodeUI: [''],
      removable: [true],
    });
  }

  /*delete row function*/
  removeRow(i: number): void {
    if (i === -1) {
      this.deleteGroup.emit(i);
    } else {
      this.ruleArray.removeAt(i);

      if (this.ruleArray.controls.length === 1) {
        this.queryCondition = this.rule.value.condition;
        this.rule.patchValue({
          condition: '',
        });
      } else if (this.ruleArray.controls.length === 0) {
        this.deleteGroup.emit(-1);
      }
      this.gLength = this.ruleArray.length;
    }
  }
  onSelectEvent(lookUpCatCode: string) {
    const list = this.lookupList
      .filter((ite) => {
        return ite.lookUpCatCode === lookUpCatCode;
      })
      .map((s: any) => {
        return s.lookUpCdt;
      });

    this.lookupValueList = list[0];
  }
  getValCate(categoryList: any, selected: any) {
    let catVal = '';
    if (selected == undefined) {
      return catVal;
    } else {
      categoryList.forEach((e: any) => {
        if (e.fieldName === selected) {
          catVal = e.fieldLabel;
        }
      });
      return catVal;
    }
  }
  getValOper(operatorList: any, selected: any) {
    let catVal = '';
    if (selected == undefined) {
      return catVal;
    } else {
      operatorList.forEach((e: any) => {
        if (e.key === selected) {
          catVal = e.value;
        }
      });
      if (catVal == 'MVEL') {
        this.showMenu = true;
      } else {
        this.showMenu = false;
      }
      return catVal;
    }
  }
  getValTyp(valueTypes: any, selected: any) {
    let catVal = '';
    if (selected == undefined) {
      return catVal;
    } else {
      valueTypes.forEach((e: any) => {
        if (e === selected) {
          catVal = e;
        }
      });
      return catVal;
    }
  }

  changeCategory(event: any, rule: any) {
    const fieldObj: any = this.categoryList.filter(
      (d: any) => event.value == d.fieldName
    );
    if (fieldObj && fieldObj.length > 0) {
      rule.patchValue({
        fieldType: fieldObj[0].fieldType,
      });
    }
  }

  openDialogWithTemplateRef(templateRef: TemplateRef<any>) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.hasBackdrop = false;
    this.dialogRef = this.dialog.open(templateRef, dialogConfig);
  }

  close() {
    this.dialogRef.close();
  }
}
