import { Routes } from '@angular/router';

import { TripListComponent } from './components/trip-list/trip-list.component';
import { TripAdd } from './components/trip-add/trip-add';
import { TripEdit } from './components/trip-edit/trip-edit';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'trips', pathMatch: 'full' },
  { path: 'trips', component: TripListComponent },
  { path: 'trips/add', component: TripAdd },
  { path: 'trips/edit/:tripId', component: TripEdit },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'trips' }
];
