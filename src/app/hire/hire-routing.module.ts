import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import pageMeta from '../page-meta.json';
import { HireComponent } from './hire.component';

const routes: Routes = [
  {
    path: '',
    component: HireComponent,
    data: pageMeta.hire
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HireRoutingModule { }
