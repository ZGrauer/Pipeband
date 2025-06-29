import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';

import { PhotosRoutingModule } from './photos-routing.module';
import { PhotosComponent } from './photos.component';
import { GalleryViewComponent } from './gallery-view/gallery-view.component';

@NgModule({
  declarations: [PhotosComponent, GalleryViewComponent],
  imports: [
    CommonModule,
    PhotosRoutingModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule
  ]
})
export class PhotosModule { }
