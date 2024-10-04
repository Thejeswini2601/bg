import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Route } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { LoginComponent } from './app/login/login.component';
import { RegisterComponent } from './app/register/register.component';
import { BudgetPlannerHomeComponent } from './app/budget-planner-home/budget-planner-home.component';
import { BudgetGoalsComponent } from './app/budget-goals/budget-goals.component'; // Import the BudgetGoalsComponent
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TrackYourExpensesComponent } from './app/track-your-expenses/track-your-expenses.component'; // Import TrackYourExpensesComponent
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModulez
import { BudgetingTipsComponent } from './app/budgeting-tips/budgeting-tips.component';
import { ReportComponent } from './app//reports/reports.component';

const routes: Route[] = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: BudgetPlannerHomeComponent },
  { path: 'budget-tips', component: BudgetingTipsComponent },
  { path: 'report', component:ReportComponent },
  { path: 'track-your-expenses', component: TrackYourExpensesComponent }, // Add route for TrackYourExpensesComponent
  { path: 'set-goals', component: BudgetGoalsComponent }, // Add route for BudgetGoalsComponent
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(BrowserAnimationsModule, HttpClientModule) // Include HttpClientModule here
  ]
})
.catch(err => console.error(err));
