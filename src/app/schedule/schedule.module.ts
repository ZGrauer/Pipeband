import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

import { ScheduleRoutingModule } from './schedule-routing.module';
import { ScheduleComponent } from './schedule.component';

@NgModule({
  declarations: [ScheduleComponent],
  imports: [
    CommonModule,
    ScheduleRoutingModule,
    MatExpansionModule,
    MatListModule,
    MatCardModule
  ]
})
export class ScheduleModule { }
