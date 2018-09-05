import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable, BehaviorSubject } from "rxjs";

import { Todo } from "../doctor.model";
import { DoctorsService } from "../doctors.service";

export class TodosDataSource implements DataSource<Todo> {
  private todosSubject = new BehaviorSubject<Todo[]>([]);
  public length: string;

  constructor(private doctorsService: DoctorsService) {}

  loadTodos(docId: string, pageIndex: number, pageSize: number) {
    this.doctorsService
      .getTasks(docId, pageIndex, pageSize)
      .subscribe(resp => {
        this.length = resp.headers.get('X-Total-Count');
        this.todosSubject.next(resp.body);
      });
  }

  connect(collectionViewer: CollectionViewer): Observable<Todo[]> {
    //console.log("Connecting data source");
    return this.todosSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    //console.log("Disconnecting data source");
    this.todosSubject.complete();
  }
}
