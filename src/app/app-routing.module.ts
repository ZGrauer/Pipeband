import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HireComponent } from './hire/hire.component';
import { HomeComponent } from './home/home.component';
import { MembersComponent } from './members/members.component';
import { MerchComponent } from './merch/merch.component';
import { MusicComponent } from './music/music.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { LoginComponent } from './login/login.component';
import { PhotosComponent } from './photos/photos.component';

import { AuthGuard } from './auth.guard';


const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'hire', component: HireComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent },
  { path: 'merch', component: MerchComponent },
  { path: 'music', component: MusicComponent },
  { path: 'schedule', component: ScheduleComponent },
  { path: 'members', component: MembersComponent, canActivate: [AuthGuard] },
  { path: 'login' , component: LoginComponent},
  { path: 'photo' , component: PhotosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
