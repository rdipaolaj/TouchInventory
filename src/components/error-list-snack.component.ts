// error-list-snack.component.ts
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
    standalone: true,
    selector: 'app-error-list-snack',
    imports: [
        CommonModule,
        MatIconModule,  
        MatButtonModule,
    ],
    template: `
    <div class="snack-container">
      <div class="snack-header">
        <h3>{{ data.title }}</h3>
        <!-- Botón de cerrar -->
        <button mat-icon-button color="warn" (click)="closeSnack()">
          <mat-icon>close</mat-icon>
        </button>
      </div>
      <ul>
        <li *ngFor="let e of data.errorDetails">{{ e }}</li>
      </ul>
    </div>
  `,
    styles: [`
    .snack-container {
      color: #fff;
      min-width: 300px;
    }
    .snack-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }
    h3 {
      margin: 0;
    }
    ul {
      margin: 0; 
      padding-left: 1.2rem;
    }
  `]
})
export class ErrorListSnackComponent {
    constructor(
        @Inject(MAT_SNACK_BAR_DATA) public data: { title: string; errorDetails: string[] },
        private snackRef: MatSnackBarRef<ErrorListSnackComponent>
    ) { }

    closeSnack() {
        this.snackRef.dismiss();
    }
}
