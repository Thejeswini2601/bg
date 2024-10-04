import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';  // Ensure the correct path to auth.service
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  standalone: true, // Mark it as standalone
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    ReactiveFormsModule, 
    CommonModule, 
    RouterModule, 
    HttpClientModule ,
     // Include HttpClientModule here for HttpClient to work
  ]
})
export class LoginComponent {
  loginForm: FormGroup;
  emailError: string | null = null;
  passwordError: string | null = null;
  formError: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogin() {
    // Reset errors
    this.emailError = null;
    this.passwordError = null;
    this.formError = null;

    // Check if the form is invalid
    if (this.loginForm.invalid) {
      this.emailError = this.loginForm.get('email')?.hasError('required') ? 'Email is required' : 
                        this.loginForm.get('email')?.hasError('email') ? 'Invalid email address' : null;
      this.passwordError = this.loginForm.get('password')?.hasError('required') ? 'Password is required' : 
                           this.loginForm.get('password')?.hasError('minlength') ? 'Password must be at least 6 characters' : null;
      
      if (this.loginForm.get('email')?.invalid || this.loginForm.get('password')?.invalid) {
        this.formError = 'Please fill out all fields correctly.';
      }

      return;
    }

    // Call the login API via AuthService
    this.authService.login(this.loginForm.value).subscribe(
      response => {
        console.log('Login successful', response);
        // Redirect to home or dashboard upon successful login
        this.router.navigate(['/home']);
      },
      error => {
        console.error('Login failed', error);
        this.formError = 'Invalid login credentials. Please try again.';
      }
    ); 
  }
  // Reset email error when the user focuses on the email input field
  onEmailFocus() {
    this.emailError = null;
  }

  // Reset password error when the user focuses on the password input field
  onPasswordFocus() {
    this.passwordError = null;
  }
}