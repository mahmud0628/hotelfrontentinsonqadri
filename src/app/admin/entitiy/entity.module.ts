import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { UsersComponent } from './users/users.component';
import { RouterModule } from '@angular/router';

import { MaterialModule } from './../../shared/material/material.module';
import { MatCardModule } from '@angular/material/card';
import { XodimComponent } from './xodim/xodim.component';
import { BinoComponent } from '../components/bino/bino.component';
import { XonaComponent } from '../components/xona/xona.component';

@NgModule({
  declarations: [
    UsersComponent,
    XodimComponent,
    BinoComponent,
    XonaComponent 
   
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    RouterModule,
    MaterialModule,
    MatCardModule
    
  ]
})
export class EntityModule { }
