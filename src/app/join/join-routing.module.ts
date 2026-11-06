import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JoinComponent } from './join.component';

const routes: Routes = [
  {
    path: '',
    component: JoinComponent,
    data: {
      title: "Join the Band - Kansas City St. Andrew Pipes & Drums",
      description: "Learn the bagpipes or drums for free in Kansas City. The Kansas City St. Andrew Pipes & Drums offers free weekly lessons, charges no dues and welcomes new members of any age."
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JoinRoutingModule { }
