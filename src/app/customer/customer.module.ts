import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { SharedModule } from '../shared/shared.module';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [CustomerComponent],
  imports: [CommonModule, CustomerRoutingModule, SharedModule, MatTableModule],
})
export class CustomerModule { }
