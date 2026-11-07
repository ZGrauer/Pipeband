import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import pageMeta from '../page-meta.json';
import { ScheduleComponent } from './schedule.component';

const routes: Routes = [
  {
    path: '',
    component: ScheduleComponent,
    data: pageMeta.schedule
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleRoutingModule { }
