// src/app/products/notification-dialog/notification-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-notification-dialog',
  templateUrl: './notification-dialog.component.html',
  styleUrls: ['./notification-dialog.component.css'],
  imports: [MatDialogModule, MatButtonModule],
})
export class NotificationDialogComponent {
  title: string = '';
  message: string = '';

  constructor(
    private dialogRef: MatDialogRef<NotificationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string }
  ) {
    this.title = data.title;
    this.message = data.message;
  }

  onClose(): void {
    this.dialogRef.close();
  }
}