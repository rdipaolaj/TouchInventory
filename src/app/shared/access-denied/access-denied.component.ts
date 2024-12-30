// src/app/shared/access-denied/access-denied.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
    standalone: true,
    selector: 'app-access-denied',
    template: `
    <div class="access-denied">
      <mat-card class="access-card">
        <mat-card-title class="error-title">Acceso Denegado</mat-card-title>
        <mat-card-content>
          <p class="error-message">No tienes permisos para acceder a esta página.</p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="primary" (click)="goToDashboard()">Volver al Inicio</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
    styles: [`
    .access-denied {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background: linear-gradient(to bottom right, #f8f9fa, #e9ecef);
    }

    .access-card {
      width: 100%;
      max-width: 450px;
      text-align: center;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    }

    .error-title {
      color: #d32f2f;
      font-size: 2.5rem;
      font-weight: bold;
      margin-bottom: 20px;
    }

    .error-message {
      font-size: 1.4rem;
      color: #495057;
      margin-bottom: 30px;
    }

    .mat-card-actions {
      display: flex;
      justify-content: center;
    }

    button[mat-raised-button] {
      padding: 10px 20px;
      font-size: 1.1rem;
      font-weight: bold;
    }
  `],
    imports: [MatButtonModule, MatCardModule]
})
export class AccessDeniedComponent {
    constructor(private router: Router) { }

    goToDashboard() {
        this.router.navigate(['/dashboard']);
    }
}
