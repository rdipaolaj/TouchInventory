import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl
} from '@angular/forms';
import { Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';

import { ErrorListSnackComponent } from '../../../components/error-list-snack.component';

import { CreateUserCommand, CreateUserResponse } from './models/register.models';
import { ApiResponse, ErrorDetail } from '../../shared/models/api-response.model';
import { RegisterService } from './service/register.service';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSnackBarModule,
    RouterModule,
    MatSelectModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  /** Grupo de formularios con validaciones */
  registerForm = new FormGroup({
    username: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    email: new FormControl<string>('', [
      Validators.required,
      Validators.email
    ]),
    phoneNumber: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(7)
    ]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(4)
    ]),
    confirmPassword: new FormControl<string>('', [
      Validators.required
    ]),
    userRole: new FormControl<number>(1, [Validators.required])
  }, { validators: [this.passwordsMatchValidator] });

  constructor(
    private router: Router,
    private registerService: RegisterService,
    private snackBar: MatSnackBar
  ) { }

  onRegister() {
    if (!this.registerForm.valid) {
      this.showSnackError('Por favor, corrige los errores en el formulario.');
      this.registerForm.markAllAsTouched();
      return;
    }

    const {
      username,
      email,
      phoneNumber,
      password,
      userRole
    } = this.registerForm.value;

    const command: CreateUserCommand = {
      username: username ?? '',
      email: email ?? '',
      phoneNumber: phoneNumber ?? '',
      password: password ?? '',
      userRole: userRole ?? 1
    };

    this.registerService.createUser(command).subscribe({
      next: (resp: ApiResponse<CreateUserResponse>) => {
        if (resp.success) {
          this.showSnackSuccess('¡Usuario creado con éxito!');
          console.log('Usuario creado, ID:', resp.data.userId);
          this.router.navigate(['/auth/login']);
        } else {
          this.handleServerError(resp.message, resp.errors);
        }
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 400 && err.error) {
          const body = err.error as ApiResponse<null>;
          console.error('Error 400: ', body);
          this.handleServerError(body.message, body.errors);
        } else {
          console.error('Error de red o del servidor:', err);
          this.showSnackError('Ha ocurrido un error en el servidor.');
        }
      }
    });
  }

  // Validador contraseñas
  passwordsMatchValidator(form: AbstractControl) {
    const password = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    if (password && confirm && password !== confirm) {
      return { passwordsMismatch: true };
    }
    return null;
  }

  isInvalidControl(controlName: string): boolean {
    const control = this.registerForm.get(controlName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  hasPasswordMismatchError(): boolean {
    const mismatch = this.registerForm.hasError('passwordsMismatch');
    const passControl = this.registerForm.get('password');
    const confirmControl = this.registerForm.get('confirmPassword');
    const passTouched = passControl?.dirty || passControl?.touched;
    const confirmTouched = confirmControl?.dirty || confirmControl?.touched;
    return mismatch && !!passTouched && !!confirmTouched;
  }

  // Mensajes
  private showSnackSuccess(msg: string) {
    this.snackBar.open(msg, 'Cerrar', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }

  private showSnackError(msg: string) {
    this.snackBar.open(msg, 'Cerrar', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }

  private handleServerError(serverMessage: string, errors: ErrorDetail[] = []) {
    const errorTexts = errors.map(err => err.description);

    this.snackBar.openFromComponent(ErrorListSnackComponent, {
      data: {
        title: serverMessage || 'Error en la validación de usuario.',
        errorDetails: errorTexts
      },
      panelClass: ['error-snackbar'],
      duration: 8000
    });
  }
}