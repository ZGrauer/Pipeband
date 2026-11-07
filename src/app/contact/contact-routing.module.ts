import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import pageMeta from '../page-meta.json';
import { ContactComponent } from './contact.component';

const routes: Routes = [
  {
    path: '',
    component: ContactComponent,
    data: pageMeta.contact
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule { }
