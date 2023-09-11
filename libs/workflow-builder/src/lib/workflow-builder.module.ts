import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkflowBuilderComponent } from './workflow-builder/workflow-builder.component';

@NgModule({
  imports: [CommonModule],
  declarations: [WorkflowBuilderComponent],
  exports: [WorkflowBuilderComponent],
})
export class WorkflowBuilderModule {}
