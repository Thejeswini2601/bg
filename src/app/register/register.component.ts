import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router'; 
import { AuthService } from '../auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
})
export class RegisterComponent {
  registerForm: FormGroup;
  usernameError: string | null = null;
  emailError: string | null = null;
  passwordErrors: { upperCase: boolean; lowerCase: boolean; specialChar: boolean } | null = null;
  formError: string | null = null;
  isSubmitted = false; // To track form submission

  constructor(
    private fb: FormBuilder,
    private authService: AuthService, 
    private router: Router 
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), this.passwordValidator]],
    });
  }

  passwordValidator(control: AbstractControl) {
    const password = control.value || '';
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const passwordValid = hasUpperCase && hasLowerCase && hasSpecialChar;

    if (!passwordValid) {
      return {
        passwordRequirements: {
          hasUpperCase,
          hasLowerCase,
          hasSpecialChar
        }
      };
    }
    return null;
  }

  onRegister() {
    this.isSubmitted = true;

    // Reset errors
    this.usernameError = null;
    this.emailError = null;
    this.passwordErrors = null;
    this.formError = null;

    // Check if the form is invalid
    if (this.registerForm.invalid) {
      this.usernameError = this.registerForm.get('username')?.hasError('required') ? 'Username is required' : null;
      this.emailError = this.registerForm.get('email')?.hasError('email') ? 'Invalid email address' :
                        this.registerForm.get('email')?.hasError('required') ? 'Email is required' : null;

      // Check password errors
      const passwordControl = this.registerForm.get('password');
      if (passwordControl?.errors?.['passwordRequirements']) {
        const requirements = passwordControl.errors['passwordRequirements'];
        this.passwordErrors = {
          upperCase: !requirements.hasUpperCase,
          lowerCase: !requirements.hasLowerCase,
          specialChar: !requirements.hasSpecialChar
        };
      }
      
      this.formError = 'Please fill out all fields correctly.';
      return;
    }

    // Call the AuthService to register the user
    this.authService.register(this.registerForm.value).subscribe(
      response => {
        console.log('Registration successful', response);
        // Redirect to login page after successful registration
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Registration failed', error);
        this.formError = 'Registration failed. Please try again.';
      }
    );
  }

  // Focus Event Handlers to Reset Errors
  onUsernameFocus() {
    this.usernameError = null;
  }

  onEmailFocus() {
    this.emailError = null;
  }

  onPasswordFocus() {
    this.passwordErrors = null;
  }
}