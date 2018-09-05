import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { tap } from "rxjs/operators";
import { MatPaginator } from "@angular/material";

import { DoctorsService } from "../doctors.service";
import { TodosDataSource } from "./tasks.datasource";

@Component({
  selector: "app-doctor-tasks",
  templateUrl: "./doctor-tasks.component.html",
  styleUrls: ["./doctor-tasks.component.css"]
})
export class DoctorTasksComponent implements OnInit, OnDestroy {
  doctorId: string;ß
  subscription: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private doctorsService: DoctorsService) {}

  dataSource: TodosDataSource;
  displayedColumns = ["title", "completed"];

  ngOnInit() {
    this.dataSource = new TodosDataSource(this.doctorsService);

    this.subscription = this.doctorsService.doctorId.subscribe(
      (dId: string) => {
        this.doctorId = dId;
        this.dataSource.loadTodos(dId, 0, this.paginator.pageSize);
      }
    );
  }

  ngAfterViewInit() {
    this.paginator.page.pipe(tap(() => this.loadTodosPage())).subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadTodosPage() {
    this.dataSource.loadTodos(
      this.doctorId,
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  }
}
