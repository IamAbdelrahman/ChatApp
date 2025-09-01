import { Component, OnInit, signal } from '@angular/core';
import { 
  FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn,
  FormsModule, ReactiveFormsModule 
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.html',
  styleUrls: ['./change-password.css'],
  imports:[CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm!: FormGroup;
  showCurrentPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;

  isSubmitting = signal(false);
  successMessage = signal<string | null>(null);
  errorMessage = signal<string | null>(null);

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.changePasswordForm = this.formBuilder.group({
      currentPassword: ['', [Validators.required, Validators.minLength(1)]],
      newPassword: ['', [
        Validators.required,
        Validators.minLength(8),
        this.hasUpperCaseValidator(),
        this.hasNumberValidator()
      ]],
      confirmNewPassword: ['', Validators.required]
    }, {
      validators: [
        this.passwordMismatchValidator('newPassword', 'confirmNewPassword'),
        this.sameAsOldPasswordValidator('currentPassword', 'newPassword')
      ]
    });
  }

  // ---------------- Custom validators ----------------
  private passwordMismatchValidator(passwordControlName: string, confirmPasswordControlName: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const password = group.get(passwordControlName)?.value;
      const confirmPassword = group.get(confirmPasswordControlName)?.value;
      return password && confirmPassword && password !== confirmPassword
        ? { passwordMismatch: true }
        : null;
    };
  }

  private sameAsOldPasswordValidator(oldPassword: string, newPassword: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const oldPass = group.get(oldPassword)?.value;
      const newPass = group.get(newPassword)?.value;
      return oldPass && newPass && oldPass === newPass
        ? { sameAsOld: true }
        : null;
    };
  }

  private hasUpperCaseValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return /[A-Z]/.test(control.value) ? null : { hasUpperCase: true };
    };
  }

  private hasNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return /[0-9]/.test(control.value) ? null : { hasNumber: true };
    };
  }

  // ---------------- Helper methods ----------------
  isFieldInvalid(fieldName: string): boolean {
    const control = this.changePasswordForm.get(fieldName);
    return !!control?.invalid && (control.dirty || control.touched);
  }

  getPasswordStrengthClass(): string {
    const score = this.calculatePasswordStrength(this.changePasswordForm.get('newPassword')?.value);
    if (score >= 3) return 'strong';
    if (score === 2) return 'medium';
    if (score === 1) return 'weak';
    return '';
  }

  getPasswordStrengthText(): string {
    const score = this.calculatePasswordStrength(this.changePasswordForm.get('newPassword')?.value);
    if (score >= 3) return 'Strong';
    if (score === 2) return 'Medium';
    if (score === 1) return 'Weak';
    return '';
  }

  private calculatePasswordStrength(password: string): number {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    return score;
  }

  hasMinLength(): boolean {
    const value = this.changePasswordForm.get('newPassword')?.value;
    return value?.length >= 8;
  }

  hasUpperCase(): boolean {
    const value = this.changePasswordForm.get('newPassword')?.value;
    return /[A-Z]/.test(value);
  }

  hasNumber(): boolean {
    const value = this.changePasswordForm.get('newPassword')?.value;
    return /[0-9]/.test(value);
  }

  // ---------------- Actions ----------------
  async onSubmit(): Promise<void> {
    this.successMessage.set(null);
    this.errorMessage.set(null);

    if (this.changePasswordForm.invalid) {
      this.changePasswordForm.markAllAsTouched();
      this.errorMessage.set('Please correct the errors in the form.');
      return;
    }

    this.isSubmitting.set(true);

    // Simulate API call
    setTimeout(() => {
      this.successMessage.set('Password updated successfully!');
      this.changePasswordForm.reset();
      this.isSubmitting.set(false);
    }, 1500);
  }

  onCancel(): void {
    this.changePasswordForm.reset();
    this.isSubmitting.set(false);
    this.successMessage.set(null);
    this.errorMessage.set(null);
  }

  // ---------------- UI helpers ----------------
  toggleCurrentPassword(): void { this.showCurrentPassword = !this.showCurrentPassword; }
  toggleNewPassword(): void { this.showNewPassword = !this.showNewPassword; }
  toggleConfirmPassword(): void { this.showConfirmPassword = !this.showConfirmPassword; }
}
