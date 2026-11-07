import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import pageMeta from '../page-meta.json';
import { AboutComponent } from './about.component';

const routes: Routes = [
  {
    path: '',
    component: AboutComponent,
    data: pageMeta.about
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule { }
