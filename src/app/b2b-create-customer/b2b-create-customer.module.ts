import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { B2bCreateCustomerRoutingModule } from './b2b-create-customer-routing.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { B2bCreateCustomerComponent } from './b2b-create-customer.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    B2bCreateCustomerComponent
  ],
  imports: [
    CommonModule,
    B2bCreateCustomerRoutingModule,
    MatTooltipModule,
    SharedModule
  ]
})
export class B2bCreateCustomerModule { }
