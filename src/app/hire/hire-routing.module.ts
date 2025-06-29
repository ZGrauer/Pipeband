import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HireComponent } from './hire.component';

const routes: Routes = [
  {
    path: '',
    component: HireComponent,
    data: {
      title: "Hire Us - Kansas City St. Andrew Pipes & Drums",
      description: "From weddings to sold-out concerts, the Kansas City St. Andrew Pipes and Drums will make your event unforgettable! As Kansas City's premier pipe band, we are proud to provide award-winning individual bagpipers, small ensembles, or even a full band for your next event."
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HireRoutingModule { }
