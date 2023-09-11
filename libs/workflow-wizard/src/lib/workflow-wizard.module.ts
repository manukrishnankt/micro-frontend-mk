import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckBoxComponent } from './components/dynamic-components/check-box/check-box.component';
import { DropDownComponent } from './components/dynamic-components/drop-down/drop-down.component';
import { HiddenFieldComponent } from './components/dynamic-components/hidden-field/hidden-field.component';
import { LabelComponent } from './components/dynamic-components/label/label.component';
import { RadioButtonComponent } from './components/dynamic-components/radio-button/radio-button.component';
import { TextAreaComponent } from './components/dynamic-components/text-area/text-area.component';
import { TextBoxComponent } from './components/dynamic-components/text-box/text-box.component';
import { DynamicFormWrapperComponent } from './components/dynamic-form-wrapper/dynamic-form-wrapper.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { MaterialModule } from './shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LanguageTranslatorPipe } from './directives/language-translator/language-translator.pipe';

@NgModule({
  declarations: [
    DynamicFormComponent,
    DynamicFormWrapperComponent,
    TextBoxComponent,
    DropDownComponent,
    CheckBoxComponent,
    RadioButtonComponent,
    TextAreaComponent,
    LabelComponent,
    HiddenFieldComponent,
    LanguageTranslatorPipe,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
  providers: [LanguageTranslatorPipe],
})
export class WorkflowWizardModule {}
