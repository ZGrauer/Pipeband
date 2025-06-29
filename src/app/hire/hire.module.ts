import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule and ReactiveFormsModule
import { MatFormFieldModule } from '@angular/material/form-field'; // Import MatFormFieldModule
import { MatInputModule } from '@angular/material/input'; // Import MatInputModule
import { MatButtonModule } from '@angular/material/button'; // Import MatButtonModule
import { MatCardModule } from '@angular/material/card'; // Import MatCardModule

import { HireRoutingModule } from './hire-routing.module';
import { HireComponent } from './hire.component';

@NgModule({
  declarations: [HireComponent],
  imports: [
    CommonModule,
    HireRoutingModule,
    FormsModule, // Add FormsModule here
    ReactiveFormsModule, // Add ReactiveFormsModule here
    MatFormFieldModule, // Add MatFormFieldModule here
    MatInputModule, // Add MatInputModule here
    MatButtonModule, // Add MatButtonModule here
    MatCardModule // Add MatCardModule here
  ]
})
export class HireModule { }
