// src/app/products/product-list/product-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProductResponse } from '../models/product.models';
import { ProductService } from '../services/product.service';
import { DeleteConfirmDialogComponent } from '../delete-confirm-dialog/delete-confirm-dialog.component';
import { NotificationDialogComponent } from '../notification-dialog/notification-dialog.component';

@Component({
  standalone: true,
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
  ],
})
export class ProductListComponent implements OnInit {
  products: ProductResponse[] = [];
  loading: boolean = false;
  hasLowStock: boolean = false;
  displayedColumns: string[] = [ /*'id', */'nombre', 'descripcion', 'precio', 'cantidad', 'categoria', 'acciones'];

  constructor(private productService: ProductService, private dialog: MatDialog) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;
    this.productService.listProducts().subscribe({
      next: (response) => {
        if (response.success) {
          this.products = response.data;
          this.hasLowStock = this.products.some(product => product.cantidad < 5);
        } else {
          console.error('Error al obtener la lista de productos:', response.message);
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error en la solicitud:', err);
        this.loading = false;
      },
    });
  }

  sendNotifications() {
    if (!this.hasLowStock) {
      this.openNotificationDialog(
        'Sin Notificaciones',
        'No hay productos con inventario bajo para notificar.'
      );
      return;
    }

    this.productService.sendLowStockNotifications().subscribe({
      next: (response) => {
        if (response.success) {
          this.openNotificationDialog(
            'Notificaciones Enviadas',
            'Las notificaciones de inventario bajo se enviaron con éxito.'
          );
        } else {
          this.openNotificationDialog(
            'Error',
            'Ocurrió un error al enviar las notificaciones. Por favor, inténtalo de nuevo.'
          );
        }
      },
      error: (err) => {
        this.openNotificationDialog(
          'Error',
          'Ocurrió un error al procesar la solicitud. Por favor, inténtalo más tarde.'
        );
      },
    });
  }

  openNotificationDialog(title: string, message: string): void {
    this.dialog.open(NotificationDialogComponent, {
      data: { title, message },
    });
  }

  onDelete(productId: number) {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productService.deleteProduct(productId).subscribe({
          next: () => {
            this.products = this.products.filter((p) => p.id !== productId);
            this.hasLowStock = this.products.some(product => product.cantidad < 5);
          },
          error: (err) => console.error('Error al eliminar producto:', err),
        });
      }
    });
  }


}
