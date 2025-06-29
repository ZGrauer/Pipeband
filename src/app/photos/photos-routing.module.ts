import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhotosComponent } from './photos.component';
import { GalleryViewComponent } from './gallery-view/gallery-view.component';

const routes: Routes = [
  {
    path: '',
    component: PhotosComponent,
    data: {
      title: "Photo - Gallery - Kansas City St. Andrew Pipes & Drums",
      description: "Photo galleries of the band's past performances."
    }
  },
  {
    path: ':galleryId',
    component: GalleryViewComponent,
    data: {
      title: "Photo Gallery - Kansas City St. Andrew Pipes & Drums",
      description: "View photos from our events."
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhotosRoutingModule { }
