import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs'; // Import MatTabsModule
import { MatExpansionModule } from '@angular/material/expansion'; // Import MatExpansionModule
import { MatButtonModule } from '@angular/material/button'; // Import MatButtonModule
import { MatDialogModule } from '@angular/material/dialog'; // Import MatDialogModule
import { StlModelViewerModule } from 'angular-stl-model-viewer'; // Import StlModelViewerModule
import { PdfViewerModule } from 'ng2-pdf-viewer'; // Import PdfViewerModule
import { MatListModule } from '@angular/material/list'; // Import MatListModule
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
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

@NgModule({
  declarations: [MembersComponent, SheetMusicComponent],
  imports: [
    CommonModule,
    MembersRoutingModule,
    MatTabsModule, // Add MatTabsModule here
    MatExpansionModule, // Add MatExpansionModule here
    MatButtonModule, // Add MatButtonModule here
    MatDialogModule, // Add MatDialogModule here
    StlModelViewerModule, // Add StlModelViewerModule here
    PdfViewerModule, // Add PdfViewerModule here
    MatListModule, // Add MatListModule here
    MatPaginatorModule,
    MatCardModule,
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
