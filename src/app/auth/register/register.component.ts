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

// Módulos de Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

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
    RouterModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {

  // Creamos el form group con validaciones básicas
  registerForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required]),
    confirmPassword: new FormControl<string>('', [Validators.required]),
  }, { validators: [this.passwordsMatchValidator] });

  constructor(private router: Router) { }

  onRegister() {
    if (this.registerForm.valid) {
      const { name, email, password, confirmPassword } = this.registerForm.value;
      console.log('Registrando usuario:', name, email, password, confirmPassword);

      // Aquí normalmente llamas un servicio, por ejemplo:
      // this.authService.register({ name, email, password }).subscribe(
      //    (resp) => {
      //       // Redirigir al login o loguear directamente al usuario
      //       this.router.navigate(['/auth/login']);
      //    },
      //    (err) => console.error(err)
      // );

      // Como ejemplo: redirigimos al login
      this.router.navigate(['/auth/login']);
    }
  }

  /**
   * Validador para comprobar que password y confirmPassword coinciden.
   * Si no coinciden, se setea un error en el form group.
   */
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

  // Para mostrar error de passwordsMismatch
  hasPasswordMismatchError(): boolean {
    // 1. Verificamos si el formGroup tiene el error global
    const mismatch = this.registerForm.hasError('passwordsMismatch');
  
    // 2. Obtenemos los controles
    const passControl = this.registerForm.get('password');
    const confirmControl = this.registerForm.get('confirmPassword');
  
    // 3. Verificamos si están “sucios” o “tocados”
    const passTouched = passControl?.dirty || passControl?.touched;
    const confirmTouched = confirmControl?.dirty || confirmControl?.touched;
  
    // 4. Retornamos una expresión 100% booleana
    return mismatch && !!passTouched && !!confirmTouched;
  }
}