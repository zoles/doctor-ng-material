import { NgModule } from "@angular/core";
import { RouterModule, Routes} from "@angular/router"
import { DoctorListComponent} from "./doctors/doctor-list/doctor-list.component"
import { DoctorDetailComponent } from "./doctors/doctor-detail/doctor-detail.component";

const routes: Routes = [
  { path: '', component: DoctorListComponent },
  { path: 'doctor/:doctorId', component: DoctorDetailComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
