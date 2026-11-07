import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import pageMeta from '../page-meta.json';
import { MusicComponent } from './music.component';

const routes: Routes = [
  {
    path: '',
    component: MusicComponent,
    data: pageMeta.music
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MusicRoutingModule { }
