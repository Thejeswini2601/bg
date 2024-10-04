import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-budget-planner-home',
  standalone: true,
  imports: [RouterModule, CommonModule], // Add RouterModule here
  templateUrl: './budget-planner-home.component.html',
  styleUrls: ['./budget-planner-home.component.css']
})
export class BudgetPlannerHomeComponent {
  isSettingsMenuVisible: boolean = false;

  constructor(public router: Router) {}

  toggleSettingsMenu() {
    this.isSettingsMenuVisible = !this.isSettingsMenuVisible;
  }

  navigateToTrackExpenses() {
    this.router.navigate(['/track-your-expenses']);
  }
  navigateToReports() {
    this.router.navigateByUrl('/report'); // Navigate to Reports page
  }

  goBack() {
    this.router.navigate(['/']); // Navigate to any default page or previous page
  }
  logout() {
    // Clear user session or token if applicable
    // localStorage.removeItem('userToken');
    
    // Navigate to the login page
    this.router.navigate(['/login']);
  }
}
