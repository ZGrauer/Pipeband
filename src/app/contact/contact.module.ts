import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule and ReactiveFormsModule
import { MatFormFieldModule } from '@angular/material/form-field'; // Import MatFormFieldModule
import { MatInputModule } from '@angular/material/input'; // Import MatInputModule
import { MatButtonModule } from '@angular/material/button'; // Import MatButtonModule
import { MatCardModule } from '@angular/material/card'; // Import MatCardModule


import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';

@NgModule({
  declarations: [ContactComponent],
  imports: [
    CommonModule,
    ContactRoutingModule,
    FormsModule, // Add FormsModule here
    ReactiveFormsModule, // Add ReactiveFormsModule here
    MatFormFieldModule, // Add MatFormFieldModule here
    MatInputModule, // Add MatInputModule here
    MatButtonModule, // Add MatButtonModule here
    MatCardModule // Add MatCardModule here
  ]
})
export class ContactModule { }
