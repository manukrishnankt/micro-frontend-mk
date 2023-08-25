import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrettyEditorComponent } from './pretty-editor/pretty-editor.component';
import { NgxEditorModule } from 'ngx-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransformPipe } from './shared/transform-pipe';

@NgModule({
  imports: [CommonModule, NgxEditorModule, FormsModule, ReactiveFormsModule],
  declarations: [PrettyEditorComponent, TransformPipe],
  exports: [PrettyEditorComponent],
})
export class PrettyEditorModule {}
