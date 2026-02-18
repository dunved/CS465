import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TripDataService, Trip } from '../../services/trip-data.service';

@Component({
  selector: 'app-trip-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './trip-edit.html',
  styleUrl: './trip-edit.css',
})
export class TripEdit implements OnInit {
  trip: Trip = {
    code: '',
    name: '',
    length: '',
    start: '',
    resort: '',
    perPerson: 0,
    image: '',
    price: 0,
    description: ''
  };
  loading = false;
  saving = false;
  errorMsg = '';
  successMsg = '';

  constructor(
    private tripService: TripDataService,
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const tripId = this.route.snapshot.paramMap.get('tripId');
    if (tripId) {
      this.loading = true;
      this.tripService.getTrip(tripId).subscribe({
        next: (data) => {
          this.trip = data;
          this.loading = false;
          this.cd.detectChanges();
        },
        error: (err) => {
          console.error('Failed to load trip:', err);
          this.errorMsg = 'Failed to load trip.';
          this.loading = false;
          this.cd.detectChanges();
        }
      });
    }
  }

  onSubmit(): void {
    this.saving = true;
    this.errorMsg = '';
    this.successMsg = '';

    this.tripService.updateTrip(this.trip).subscribe({
      next: () => {
        this.saving = false;
        this.successMsg = 'Trip updated successfully!';
        this.cd.detectChanges();
        setTimeout(() => {
          this.router.navigate(['/trips']);
        }, 1000);
      },
      error: (err) => {
        console.error('Update failed:', err);
        this.errorMsg = 'Failed to update trip.';
        this.saving = false;
        this.cd.detectChanges();
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/trips']);
  }
}
