import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { MerchRoutingModule } from './merch-routing.module';
import { MerchComponent } from './merch.component';

@NgModule({
  declarations: [MerchComponent],
  imports: [
    CommonModule,
    MerchRoutingModule,
    MatCardModule
  ]
})
export class MerchModule { }
