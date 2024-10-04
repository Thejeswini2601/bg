import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-budget-goals',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './budget-goals.component.html',
  styleUrls: ['./budget-goals.component.css']
})
export class BudgetGoalsComponent {
  itemToBuy: string = '';
  totalCost: number | null = null; // Initialize as null
  targetDate: string = '';
  monthlySalary: number | null = null; // Initialize as null

  savingPlanWithTarget: number[] = [];
  savingPlanWithoutTarget: number[] = [];
  monthsNeeded: number = 0;

  loanAmount: number | null = null; // Initialize as null
  interestRate: number | null = null; // Initialize as null
  loanTenure: number | null = null; // Initialize as null
  emiResult: number | null = null;

  showSavings: boolean = true; // Flag to show savings section
  showEMI: boolean = false; // Flag to show EMI section
 
  constructor(private router: Router,private location: Location) {}


  calculateSavingsPlan() {
    // Reset saving plans
    this.savingPlanWithTarget = [];
    this.savingPlanWithoutTarget = [];
    this.monthsNeeded = 0;

    // Validate input
    if (this.totalCost === null || this.monthlySalary === null || this.totalCost <= 0 || this.monthlySalary <= 0) {
      alert("Please enter valid values for all fields.");
      return;
    }

    // Calculate plan with target date
    if (this.targetDate) {
      const target = new Date(this.targetDate);
      const current = new Date();
      const monthsToTarget = Math.floor((target.getTime() - current.getTime()) / (1000 * 60 * 60 * 24 * 30));

      if (monthsToTarget <= 0) {
        alert("Target date must be in the future.");
        return;
      }

      const monthlySaving = Math.ceil(this.totalCost / monthsToTarget);
      this.savingPlanWithTarget = Array(monthsToTarget).fill(monthlySaving);
    }

    // Calculate plan without target date (10% of monthly salary)
    const monthlySaving = this.monthlySalary * 0.10;
    this.monthsNeeded = Math.ceil(this.totalCost / monthlySaving);

    this.savingPlanWithoutTarget = Array(this.monthsNeeded).fill(monthlySaving);
  }

  calculateEMI() {
    if (this.loanAmount === null || this.interestRate === null || this.loanTenure === null) {
      alert("Please fill in all fields to calculate EMI.");
      return;
    }

    const monthlyInterestRate = this.interestRate / 12 / 100;
    this.emiResult = this.loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, this.loanTenure) /
      (Math.pow(1 + monthlyInterestRate, this.loanTenure) - 1);
  }

  navigateToSavings() {
    this.showSavings = true;
    this.showEMI = false;
  }

  navigateToEMI() {
    this.showSavings = false;
    this.showEMI = true;
  }

  navigateToHome() {
    this.router.navigate(['/home']); // Adjust this path according to your routing setup
  }
  goBack() {
    this.location.back();
  }
 }