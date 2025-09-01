import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormsModule,
  ReactiveFormsModule
 } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  standalone: true
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  isSubmitting = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.registerForm = this.formBuilder.group({
      username: [
        '', 
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^[a-zA-Z0-9_]+$/) // Only letters, numbers, and underscores
        ]
      ],
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
          Validators.minLength(8)
        ]
      ],
      confirmPassword: [
        '', 
        [
          Validators.required
        ]
      ]
    }, {
      validators: this.passwordMatchValidator // Custom validator for password confirmation
    });
  }

  // Custom validator to check if passwords match
  private passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    
    // Clear the error if passwords match
    if (confirmPassword?.hasError('passwordMismatch')) {
      delete confirmPassword.errors!['passwordMismatch'];
      if (Object.keys(confirmPassword.errors!).length === 0) {
        confirmPassword.setErrors(null);
      }
    }
    
    return null;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  getPasswordStrengthClass(): string {
    const password = this.registerForm.get('password')?.value || '';
    const strength = this.calculatePasswordStrength(password);
    
    if (strength < 3) return 'weak';
    if (strength < 4) return 'medium';
    return 'strong';
  }

  getPasswordStrengthText(): string {
    const password = this.registerForm.get('password')?.value || '';
    const strength = this.calculatePasswordStrength(password);
    
    if (strength < 3) return 'Weak';
    if (strength < 4) return 'Medium';
    return 'Strong';
  }

  private calculatePasswordStrength(password: string): number {
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength++;
    
    // Contains lowercase
    if (/[a-z]/.test(password)) strength++;
    
    // Contains uppercase
    if (/[A-Z]/.test(password)) strength++;
    
    // Contains numbers
    if (/\d/.test(password)) strength++;
    
    // Contains special characters
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    return strength;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isSubmitting = true;
      
      // Get form values
      const registerData = {
        username: this.registerForm.get('username')?.value,
        email: this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value,
        confirmPassword: this.registerForm.get('confirmPassword')?.value
      };

      console.log('Registration attempt:', {
        username: registerData.username,
        email: registerData.email,
        // Don't log passwords in production
        passwordLength: registerData.password.length
      });

      // Simulate API call
      setTimeout(() => {
        this.isSubmitting = false;
        console.log('Registration successful!', {
          username: registerData.username,
          email: registerData.email
        });
        
        // Here you would typically:
        // 1. Call your authentication service
        // 2. Handle the response
        // 3. Navigate to login page or dashboard
        // 4. Show success message
        
        // For demo purposes, just show success
        alert('Registration successful! Check console for form data.');
        
        // Reset form after successful submission (optional)
        // this.registerForm.reset();
      }, 2000);
    } else {
      // Mark all fields as touched to show validation errors
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
      control?.markAsTouched();
    });
  }

  // Utility method for getting form control errors (useful for complex validation)
  getFieldError(fieldName: string): string {
    const field = this.registerForm.get(fieldName);
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
      if (field.errors['pattern'] && fieldName === 'username') {
        return 'Username can only contain letters, numbers, and underscores';
      }
      if (field.errors['passwordMismatch']) {
        return 'Passwords do not match';
      }
    }
    return '';
  }

  private capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // Method to reset form (useful for testing or clearing form)
  resetForm(): void {
    this.registerForm.reset();
    this.showPassword = false;
    this.showConfirmPassword = false;
    this.isSubmitting = false;
  }

  // Method to prefill form (useful for development/testing)
  prefillForm(): void {
    this.registerForm.patchValue({
      username: 'testuser',
      email: 'test@example.com',
      password: 'TestPassword123!',
      confirmPassword: 'TestPassword123!'
    });
  }
}