import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface Trip {
  _id?: string;
  name: string;
  length: string;
  price: number;
  description: string;
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TripDataService {
  // IMPORTANT: use proxy
  private apiUrl = '/api/trips';

  constructor(private http: HttpClient) {}

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.apiUrl, httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    const msg =
      error.error instanceof ErrorEvent
        ? error.error.message
        : `Server returned code ${error.status}, message was: ${error.message}`;
    return throwError(() => msg);
  }
}
