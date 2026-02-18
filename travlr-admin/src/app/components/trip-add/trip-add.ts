import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TripDataService, Trip } from '../../services/trip-data.service';

@Component({
  selector: 'app-trip-add',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './trip-add.html',
  styleUrl: './trip-add.css',
})
export class TripAdd {
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
  saving = false;
  errorMsg = '';
  successMsg = '';

  constructor(
    private tripService: TripDataService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.saving = true;
    this.errorMsg = '';
    this.successMsg = '';

    this.tripService.addTrip(this.trip).subscribe({
      next: () => {
        this.saving = false;
        this.successMsg = 'Trip added successfully!';
        setTimeout(() => {
          this.router.navigate(['/trips']);
        }, 1000);
      },
      error: (err) => {
        console.error('Add failed:', err);
        this.errorMsg = 'Failed to add trip. Please check all fields.';
        this.saving = false;
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/trips']);
  }
}
