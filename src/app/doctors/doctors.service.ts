import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Subject, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

import { Doctor, Todo } from './doctor.model';
import { catchError } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class DoctorsService {
  doctorId = new Subject<string>();

  public apiUrlUsers = environment.apiUrl +  "/users/";

  constructor(private httpClient: HttpClient) {}

  public getDoctors(): Observable<Doctor[]> {
    return this.httpClient.get<Doctor[]>(this.apiUrlUsers, {
      headers: new HttpHeaders().set('Accept', 'application/json')
    }).pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }

  public getDoctor(docId: string): Observable<Doctor> {
    return this. httpClient.get<Doctor>(this.apiUrlUsers + docId, {
      headers: new HttpHeaders().set('Accept', 'application/json')
    }).pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }

  public getTasks(docId: string, pageNumber = 0, pageSize = 5): Observable<HttpResponse<Todo[]>> {
    const apiUrl = environment.apiUrl + "/todos";
    const startPosition = pageNumber * pageSize;
    const endPosition = startPosition + pageSize;

    return this.httpClient.get<Todo[]>(apiUrl, {
      params: new HttpParams()
        .set('userId', docId)
        .set('_start', startPosition.toString())
        .set('_end', endPosition.toString())
        .set('_limit', pageSize.toString()),
      observe: 'response',
      headers: new HttpHeaders().set('Accept', 'application/json')
    }).pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
