import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { BROWSER_STORAGE } from '../storage';

export interface Trip {
  _id?: string;
  code: string;
  name: string;
  length: string;
  start: string;
  resort: string;
  perPerson: number;
  image: string;
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
  private apiUrl = '/api/trips';
  baseUrl = 'http://localhost:3001/api';

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.apiUrl, httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  addTrip(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.apiUrl, trip, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  updateTrip(trip: Trip): Observable<Trip> {
    return this.http.put<Trip>(this.apiUrl + '/' + trip._id, trip, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  deleteTrip(tripId: string): Observable<any> {
    return this.http.delete(this.apiUrl + '/' + tripId, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  login(user: User, passwd: string): Observable<AuthResponse> {
    return this.handleAuthAPICall('login', user, passwd);
  }

  register(user: User, passwd: string): Observable<AuthResponse> {
    return this.handleAuthAPICall('register', user, passwd);
  }

  handleAuthAPICall(endpoint: string, user: User, passwd: string): Observable<AuthResponse> {
    let formData = {
      name: user.name,
      email: user.email,
      password: passwd
    };
    return this.http.post<AuthResponse>(this.baseUrl + '/' + endpoint, formData);
  }

  private handleError(error: HttpErrorResponse) {
    const msg =
      error.error instanceof ErrorEvent
        ? error.error.message
        : `Server returned code ${error.status}, message was: ${error.message}`;
    return throwError(() => msg);
  }
}
