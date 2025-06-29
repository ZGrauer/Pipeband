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


import { MembersRoutingModule } from './members-routing.module';
import { MembersComponent } from './members.component';

@NgModule({
  declarations: [MembersComponent],
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
    MatTableModule
  ]
})
export class MembersModule { }
