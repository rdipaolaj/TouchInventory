import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  standalone: true,
  selector: 'app-forgot-password',
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {

  recoverForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
  });

  constructor(private router: Router) { }

  onRecover() {
    if (this.recoverForm.valid) {
      const { email } = this.recoverForm.value;
      console.log('Recuperar contraseña para:', email);
      // Llamada a un servicio que envía el mail de recuperación
      // this.authService.forgotPassword(email).subscribe(...);

      // Redirigir a login o mostrar un mensaje de “Revisa tu correo”
      this.router.navigate(['/auth/login']);
    }
  }
}