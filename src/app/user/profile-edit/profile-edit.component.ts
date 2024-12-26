import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css'],
  imports: [CommonModule, FormsModule],
})
export class ProfileEditComponent {
  user = {
    name: 'Juan Pérez',
    email: 'juan@example.com'
  };

  onUpdateProfile() {
    console.log('Actualizando perfil:', this.user);
    // Lógica de servicio y luego redirección.
  }
}