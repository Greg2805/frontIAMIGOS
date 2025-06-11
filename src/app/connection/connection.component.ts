import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  standalone: true,
  imports: [
    NgClass,
    ReactiveFormsModule,
    NgIf
  ],
  styleUrls: ['./connection.component.scss']
})
export class ConnectionComponent implements OnInit {
  connectionForm: FormGroup;
  isLoading = false;
  showPassword = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.connectionForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  ngOnInit(): void {
    // Vérifier si l'utilisateur est déjà connecté
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  isFieldInvalid(field: string): boolean {
    const formField = this.connectionForm.get(field);
    return formField ? formField.invalid && (formField.dirty || formField.touched) : false;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.connectionForm.invalid) {
      // Marquer tous les champs comme touchés pour afficher les validations
      Object.keys(this.connectionForm.controls).forEach(field => {
        const control = this.connectionForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
      return;
    }

    this.isLoading = true;
    this.error = null;

    const { email, password, rememberMe } = this.connectionForm.value;

    this.authService.login(email, password, rememberMe)
      .subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.error = err?.error?.message || 'Une erreur est survenue. Veuillez réessayer.';
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
  }
}
