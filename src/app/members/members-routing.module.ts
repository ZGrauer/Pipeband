import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MembersComponent } from './members.component';
import { SheetMusicComponent } from './sheet-music/sheet-music.component';
import { CompetitionsComponent } from './competitions/competitions.component';
import { ResourcesComponent } from './resources/resources.component';
import { BandInfoComponent } from './band-info/band-info.component';
import { AuthGuard } from '../auth.guard';

const description = "Content specific to band members";

const routes: Routes = [
  {
    path: '',
    component: MembersComponent,
    canActivate: [AuthGuard],
    data: {
      title: "Members Only - Kansas City St. Andrew Pipes & Drums",
      description
    },
    // Each tab has its own URL so members can bookmark or share it
    children: [
      { path: '', redirectTo: 'music', pathMatch: 'full' },
      { path: 'music', component: SheetMusicComponent, data: { title: "Sheet Music - Members - Kansas City St. Andrew Pipes & Drums", description } },
      { path: 'competitions', component: CompetitionsComponent, data: { title: "Competitions - Members - Kansas City St. Andrew Pipes & Drums", description } },
      { path: 'resources', component: ResourcesComponent, data: { title: "Resources - Members - Kansas City St. Andrew Pipes & Drums", description } },
      { path: 'info', component: BandInfoComponent, data: { title: "Band Info - Members - Kansas City St. Andrew Pipes & Drums", description } },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule { }
