import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MembersComponent } from './members.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MembersComponent,
    canActivate: [AuthGuard],
    data: {
      title: "Members Only - Kansas City St. Andrew Pipes & Drums",
      description: "Content specific to band members"
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule { }
