import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MusicComponent } from './music.component';

const routes: Routes = [
  {
    path: '',
    component: MusicComponent,
    data: {
      title: "Music - Kansas City St. Andrew Pipes & Drums",
      description: "List of the tunes the band plays for competitions, parades, and events."
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MusicRoutingModule { }
