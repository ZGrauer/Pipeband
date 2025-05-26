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
import { GalleryViewComponent } from './photos/gallery-view/gallery-view.component';

import { AuthGuard } from './auth.guard';


const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent, 
    data: {
      title: "Kansas City St. Andrew Pipes & Drums",
      description: "For 60 years Kansas City St. Andrew Pipes & Drums have worked to preserve the traditional music of Scotland. We are primarily a community-oriented band committed to furthering the development of piping and drumming in Kansas City."
    }, 
    pathMatch: 'full'
  },
  { 
    path: 'hire', 
    component: HireComponent, 
    data: {
      title: "Hire Us - Kansas City St. Andrew Pipes & Drums",
      description: "From weddings to sold-out concerts, the Kansas City St. Andrew Pipes and Drums will make your event unforgettable! As Kansas City's premier pipe band, we are proud to provide award-winning individual bagpipers, small ensembles, or even a full band for your next event."
    }
  },
  { 
    path: 'contact', 
    component: ContactComponent, 
    data: {
      title: "Contact Us - Kansas City St. Andrew Pipes & Drums",
      description: "Contact the band about Piping or dumming lessons, or booking the band for your event"
    } 
  },
  { 
    path: 'about', 
    component: AboutComponent, 
    data: {
      title: "About Us - Kansas City St. Andrew Pipes & Drums",
      description: "Past band performances, our tartan, Links"
    } 
  },
  { 
    path: 'merch', 
    component: MerchComponent, 
    data: {
      title: "Merch - Kansas City St. Andrew Pipes & Drums",
      description: "Coming Soon"
    } 
  },
  { 
    path: 'music', 
    component: MusicComponent, 
    data: {
      title: "Music - Kansas City St. Andrew Pipes & Drums",
      description: "List of the tunes the band plays for competitions, parades, and events."
    } 
  },
  { 
    path: 'schedule', 
    component: ScheduleComponent, 
    data: {
      title: "Schedule - Kansas City St. Andrew Pipes & Drums",
      description: "A schedule of the bands upcoming performances for the year."
    } 
  },
  { 
    path: 'members', 
    component: MembersComponent, 
    canActivate: [AuthGuard], 
    data: {
      title: "Members Only - Kansas City St. Andrew Pipes & Drums",
      description: "Content specific to band members"
    } 
  },
  { 
    path: 'login' , 
    component: LoginComponent, 
    data: {
      title: "Login - Kansas City St. Andrew Pipes & Drums",
      description: "Login for the band's members only page"
    }
  },
  { 
    path: 'photo' , 
    component: PhotosComponent, 
    data: {
      title: "Photo - Gallery - Kansas City St. Andrew Pipes & Drums",
      description: "Photo galleries of the band's past performances."
    }
  },
  {
    path: 'photos/:galleryId',
    component: GalleryViewComponent,
    data: {
      title: "Photo Gallery - Kansas City St. Andrew Pipes & Drums",
      description: "View photos from our events."
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
