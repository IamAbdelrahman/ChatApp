import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { 
  FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule 
} from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  standalone: true
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showPassword = false;
  isSubmitting = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.loginForm = this.formBuilder.group({
      email: [
        '', 
        [
          Validators.required,
          Validators.email
        ]
      ],
      password: [
        '', 
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ]
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isSubmitting = true;
      
      // Get form values
      const loginData = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value
      };

      console.log('Login attempt:', loginData);

      // Simulate API call
      setTimeout(() => {
        this.isSubmitting = false;
        console.log('Login successful!', loginData);
        
        // Here you would typically:
        // 1. Call your authentication service
        // 2. Handle the response
        // 3. Navigate to dashboard or show success message
        // 4. Store authentication tokens
        
        // For demo purposes, just show success
        alert('Login successful! Check console for form data.');
        
        // Reset form after successful submission (optional)
        // this.loginForm.reset();
      }, 2000);
    } else {
      // Mark all fields as touched to show validation errors
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  // Utility method for getting form control errors (useful for complex validation)
  getFieldError(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (field && field.errors && (field.dirty || field.touched)) {
      if (field.errors['required']) {
        return `${this.capitalizeFirstLetter(fieldName)} is required`;
      }
      if (field.errors['email']) {
        return 'Please enter a valid email address';
      }
      if (field.errors['minlength']) {
        return `${this.capitalizeFirstLetter(fieldName)} must be at least ${field.errors['minlength'].requiredLength} characters`;
      }
    }
    return '';
  }

  private capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // Method to reset form (useful for testing or clearing form)
  resetForm(): void {
    this.loginForm.reset();
    this.showPassword = false;
    this.isSubmitting = false;
  }

  // Method to prefill form (useful for development/testing)
  prefillForm(): void {
    this.loginForm.patchValue({
      email: 'test@example.com',
      password: 'password123'
    });
  }
}