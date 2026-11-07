import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { JoinRoutingModule } from './join-routing.module';
import { JoinComponent } from './join.component';

@NgModule({
  declarations: [JoinComponent],
  imports: [
    CommonModule,
    RouterModule,
    JoinRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ]
})
export class JoinModule { }
