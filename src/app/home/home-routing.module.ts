import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      title: "Kansas City St. Andrew Pipes & Drums",
      description: "For 60 years Kansas City St. Andrew Pipes & Drums have worked to preserve the traditional music of Scotland. We are primarily a community-oriented band committed to furthering the development of piping and drumming in Kansas City."
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
