// login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginService } from './service/login.service';
import { LoginCommand, AuthUserResponse } from './models/login.models';
import { ApiResponse } from '../../shared/models/api-response.model';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  loginForm = new FormGroup({
    username: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required]),
  });

  constructor(
    private router: Router,
    private loginService: LoginService,
    private snackBar: MatSnackBar
  ) { }

  onLogin() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value as { username: string; password: string };

      const command: LoginCommand = { username, password };

      this.loginService.login(command).subscribe({
        next: (resp: ApiResponse<AuthUserResponse>) => {
          if (resp.success) {
            const userData = resp.data;
            this.saveSessionData(userData);
            this.snackBar.open('¡Ingreso exitoso!', 'Cerrar', {
              duration: 3000,
              panelClass: ['success-snackbar']
            });

            this.router.navigate(['/dashboard']);
          } else {
            this.snackBar.open(resp.message || 'Credenciales inválidas', 'Cerrar', {
              duration: 5000,
              panelClass: ['error-snackbar']
            });
          }
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error de login =>', err);
          if (err.status === 400 && err.error) {
            const body = err.error as ApiResponse<null>;
            this.snackBar.open(body.message || 'Credenciales inválidas', 'Cerrar', {
              duration: 5000,
              panelClass: ['error-snackbar']
            });
          } else {
            this.snackBar.open('Ocurrió un error en el servidor.', 'Cerrar', {
              duration: 5000,
              panelClass: ['error-snackbar']
            });
          }
        }
      });
    }
  }

  private saveSessionData(userData: AuthUserResponse) {
    localStorage.setItem('jwtToken', userData.jwtToken);
    localStorage.setItem('tokenExpiry', userData.tokenExpiry);
    localStorage.setItem('username', userData.username);
    localStorage.setItem('userId', userData.userId);
    localStorage.setItem('userRoleValue', String(userData.userRoleValue));
  }

  isInvalidControl(controlName: string): boolean {
    const control = this.loginForm.get(controlName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }
}