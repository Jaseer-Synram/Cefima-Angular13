import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddProductRoutingModule } from './add-product-routing.module';
import { CarouselModule } from 'ngx-bootstrap/carousel';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AddProductRoutingModule,
    // CarouselModule.forRoot()
  ]
})
export class AddProductModule { }
