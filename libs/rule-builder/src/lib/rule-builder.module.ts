import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RuleBuilderComponent } from './rule-builder/rule-builder.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActionBarComponent } from './rule-builder/components/action-bar/action-bar.component';
import { GroupComponent } from './rule-builder/components/group/group.component';
import { MaterialModule } from './shared/material.module';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
  declarations: [RuleBuilderComponent, ActionBarComponent, GroupComponent],
  exports: [RuleBuilderComponent],
})
export class RuleBuilderModule {}
