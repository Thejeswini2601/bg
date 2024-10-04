import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-track-your-expenses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './track-your-expenses.component.html',
  styleUrls: ['./track-your-expenses.component.css']
})
export class TrackYourExpensesComponent {
  categories = ['Grocery', 'School Uniform', 'School Books', 'Electricity Bill', 'Other'];
  selectedCategory: string = '';
  otherCategory: string = '';
  expenseAmount: number = 0;
  expenseDate: string = '';
  expenseList: Array<{ category: string; amount: number; date: string }> = [];
  isSubmitted: boolean = false; // To track form submission

  constructor(private router: Router) {}

  // Method to add expense
  addExpense() {
    this.isSubmitted = true; // Mark form as submitted

    // Validate the form
    if (!this.isValidForm()) {
      return;
    }

    const category = this.selectedCategory === 'Other' ? this.otherCategory : this.selectedCategory;
    this.expenseList.push({
      category,
      amount: this.expenseAmount,
      date: this.expenseDate || new Date().toISOString().split('T')[0], // Set default date as today
    });

    // Clear input fields
    this.selectedCategory = '';
    this.otherCategory = '';
    this.expenseAmount = 0;
    this.expenseDate = '';
    this.isSubmitted = false; // Reset form submission state
  }

  // Check if form is valid
  isValidForm() {
    return this.selectedCategory && this.expenseAmount > 0;
  }

  // Method to navigate back to the home page
  goBack() {
    this.router.navigate(['/home']); // Navigate to BudgetPlannerHomeComponent
  }
}