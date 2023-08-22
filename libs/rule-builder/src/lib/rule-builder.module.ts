import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RuleBuilderComponent } from './rule-builder/rule-builder.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActionBarComponent } from './rule-builder/components/action-bar/action-bar.component';
import { GroupComponent } from './rule-builder/components/group/group.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [RuleBuilderComponent, ActionBarComponent, GroupComponent],
})
export class RuleBuilderModule {}
