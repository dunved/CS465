import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TripDataService, Trip } from '../../services/trip-data.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-trip-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './trip-list.component.html',
  styleUrl: './trip-list.component.css',
})
export class TripListComponent implements OnInit {
  trips: Trip[] = [];
  loading = false;
  errorMsg = '';

  constructor(
    private tripService: TripDataService,
    private authenticationService: AuthenticationService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadTrips();
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  loadTrips(): void {
    this.loading = true;
    this.errorMsg = '';

    this.tripService.getTrips().subscribe({
      next: (data) => {
        this.trips = Array.isArray(data) ? data : [];
        this.loading = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('GET /api/trips failed:', err);
        this.errorMsg = typeof err === 'string' ? err : 'Failed to load trips';
        this.loading = false;
        this.cd.detectChanges();
      }
    });
  }

  deleteTrip(trip: Trip): void {
    if (confirm('Are you sure you want to delete "' + trip.name + '"?')) {
      this.tripService.deleteTrip(trip._id!).subscribe({
        next: () => {
          this.trips = this.trips.filter(t => t._id !== trip._id);
          this.cd.detectChanges();
        },
        error: (err) => {
          console.error('Delete failed:', err);
          this.errorMsg = 'Failed to delete trip.';
        }
      });
    }
  }
}
