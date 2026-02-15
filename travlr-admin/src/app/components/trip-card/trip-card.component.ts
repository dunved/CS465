import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Trip } from '../../models/trip';
import { TripDataService } from '../../services/trip-data.service';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './trip-card.component.html'
})
export class TripCardComponent {
  @Input() trip!: Trip;
  @Output() deleted = new EventEmitter<string>();

  deleting = false;

  constructor(private tripService: TripDataService) {}

  deleteTrip() {
    if (!this.trip?._id) return;
    if (!confirm(`Delete "${this.trip.name}"?`)) return;

    this.deleting = true;
    this.tripService.deleteTrip(this.trip._id).subscribe({
      next: () => {
        this.deleting = false;
        this.deleted.emit(this.trip._id!);
      },
      error: () => {
        this.deleting = false;
        alert('Delete failed');
      }
    });
  }
}
