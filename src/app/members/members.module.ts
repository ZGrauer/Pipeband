import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';


import { MembersRoutingModule } from './members-routing.module';
import { MembersComponent } from './members.component';
import { SheetMusicComponent } from './sheet-music/sheet-music.component';
import { CompetitionsComponent } from './competitions/competitions.component';
import { ResourcesComponent } from './resources/resources.component';
import { BandInfoComponent } from './band-info/band-info.component';

@NgModule({
  declarations: [MembersComponent, SheetMusicComponent, CompetitionsComponent, ResourcesComponent, BandInfoComponent],
  imports: [
    CommonModule,
    MembersRoutingModule,
    MatTabsModule,
    MatButtonModule,
    MatDialogModule,
    MatListModule,
    MatPaginatorModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatTooltipModule,
    FormsModule
  ]
})
export class MembersModule { }
