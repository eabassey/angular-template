import { NgModule } from "@angular/core";
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import {UIElementsModule} from '4sure-ui-elements';
import { PipesModule } from '4sure-pipes';
import { NgxPaginationModule } from 'ngx-pagination';
import {WorkflowListComponent} from './workflow/workflow-list.component';
// import {ClaimCardComponent} from './workflow/claim-card/claim-card.component';
// import {JobCardComponent} from './workflow/job-card/job-card.component';

@NgModule({
  declarations: [
    WorkflowListComponent,
    // ClaimCardComponent,
    // JobCardComponent
  ],
  imports: [CommonModule, PipesModule, UIElementsModule.forRoot({environment: ''}),  RouterModule, ReactiveFormsModule, NgxPaginationModule],
  exports: [ReactiveFormsModule]
})
export class SilComponentsModule {}
