import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripDataService, Trip } from '../../services/trip-data.service';

@Component({
  selector: 'app-trip-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit {
  trips: Trip[] = [];
  loading = false;
  errorMsg = '';

  constructor(private tripService: TripDataService) {}

  ngOnInit(): void {
    this.loadTrips();
  }

  loadTrips(): void {
    this.loading = true;
    this.errorMsg = '';

    this.tripService.getTrips().subscribe({
      next: (data) => {
        this.trips = Array.isArray(data) ? data : [];
        this.loading = false;
      },
      error: (err) => {
        console.error('GET /api/trips failed:', err);
        this.errorMsg = typeof err === 'string' ? err : 'Failed to load trips';
        this.loading = false;
      }
    });
  }
}
