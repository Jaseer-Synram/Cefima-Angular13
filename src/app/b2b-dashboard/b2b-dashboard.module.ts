import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { B2bDashboardRoutingModule } from './b2b-dashboard-routing.module';
import { B2bDashboardComponent } from './b2b-dashboard.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [B2bDashboardComponent],
  imports: [CommonModule, B2bDashboardRoutingModule, SharedModule],
})
export class B2bDashboardModule {}
