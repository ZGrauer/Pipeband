import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    pathMatch: 'full'
  },
  {
    path: 'hire',
    loadChildren: () => import('./hire/hire.module').then(m => m.HireModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
  },
  {
    path: 'merch',
    loadChildren: () => import('./merch/merch.module').then(m => m.MerchModule)
  },
  {
    path: 'music',
    loadChildren: () => import('./music/music.module').then(m => m.MusicModule)
  },
  {
    path: 'schedule',
    loadChildren: () => import('./schedule/schedule.module').then(m => m.ScheduleModule)
  },
  {
    path: 'members',
    loadChildren: () => import('./members/members.module').then(m => m.MembersModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'photos',
    loadChildren: () => import('./photos/photos.module').then(m => m.PhotosModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
