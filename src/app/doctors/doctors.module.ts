import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { environment } from '../../environments/environment';

import { AngularMaterialModule } from "../angular-material.module";

import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { DoctorDetailComponent } from './doctor-detail/doctor-detail.component';
import { DoctorTasksComponent } from './doctor-tasks/doctor-tasks.component';

@NgModule({
  declarations: [
    DoctorListComponent,
    DoctorDetailComponent,
    DoctorTasksComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularMaterialModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsApiKey
    })
  ]
})
export class DoctorModule { }
