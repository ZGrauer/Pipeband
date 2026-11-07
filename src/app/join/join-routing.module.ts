import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import pageMeta from '../page-meta.json';
import { JoinComponent } from './join.component';

const routes: Routes = [
  {
    path: '',
    component: JoinComponent,
    data: pageMeta.join
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JoinRoutingModule { }
