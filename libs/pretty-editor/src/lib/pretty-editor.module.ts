import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrettyEditorComponent } from './pretty-editor/pretty-editor.component';
import { NgxEditorModule } from 'ngx-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, NgxEditorModule, FormsModule, ReactiveFormsModule],
  declarations: [PrettyEditorComponent],
  exports: [PrettyEditorComponent],
})
export class PrettyEditorModule {}
