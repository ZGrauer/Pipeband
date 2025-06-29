import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MerchComponent } from './merch.component';

const routes: Routes = [
  {
    path: '',
    component: MerchComponent,
    data: {
      title: "Merch - Kansas City St. Andrew Pipes & Drums",
      description: "Coming Soon"
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MerchRoutingModule { }
