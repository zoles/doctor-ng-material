import { NgModule } from "../../node_modules/@angular/core";
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatListModule,
  MatTableModule,
  MatSortModule
} from "@angular/material";

@NgModule({
  exports: [
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatCardModule,
    MatListModule,
    MatTableModule,
    MatSortModule
  ]
})
export class AngularMaterialModule {

}
