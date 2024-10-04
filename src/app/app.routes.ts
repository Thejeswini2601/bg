import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BudgetPlannerHomeComponent } from './budget-planner-home/budget-planner-home.component';
import { BudgetGoalsComponent } from './budget-goals/budget-goals.component'; // Import the new component
import { BudgetingTipsComponent } from './budgeting-tips/budgeting-tips.component';
import { ReportComponent } from './reports/reports.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to login by default
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: BudgetPlannerHomeComponent }, // Home page route
  { path: 'budget-tips', component: BudgetingTipsComponent },
  { path: 'set-goals', component: BudgetGoalsComponent },
  { path: 'report', component: ReportComponent }, // Route for setting budget goals
  // Add other routes here if needed
];

export { routes };