// src/app/products/product-list/product-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { ProductResponse } from '../models/product.models';
import { ProductService } from '../services/product.service';
import { DeleteConfirmDialogComponent } from '../delete-confirm-dialog/delete-confirm-dialog.component';
import { NotificationDialogComponent } from '../notification-dialog/notification-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
})
export class ProductListComponent implements OnInit {
  products: ProductResponse[] = [];
  filteredProducts: ProductResponse[] = [];
  searchQuery: string = '';
  loading: boolean = false;
  hasLowStock: boolean = false;
  displayedColumns: string[] = ['nombre', 'descripcion', 'precio', 'cantidad', 'categoria', 'acciones'];
  isAdmin: boolean = false;

  constructor(private productService: ProductService, private dialog: MatDialog) { }

  ngOnInit() {
    this.loadProducts();
    this.checkUserRole();
  }

  checkUserRole() {
    const rawUserRole = localStorage.getItem('userRoleValue');
    const userRole = parseInt(rawUserRole || '0', 10);

    this.isAdmin = userRole === 1;
    this.displayedColumns = this.isAdmin
      ? ['nombre', 'descripcion', 'precio', 'cantidad', 'categoria', 'acciones']
      : ['nombre', 'descripcion', 'precio', 'cantidad', 'categoria'];
  }

  loadProducts() {
    this.loading = true;
    this.productService.listProducts().subscribe({
      next: (response) => {
        console.log('Respuesta del servicio:', response);

        if (response.success) {
          this.products = response.data;
          this.filteredProducts = [...this.products];
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

  applyFilter() {
    const query = this.searchQuery.toLowerCase();

    this.filteredProducts = this.products.filter(
      (product) =>
        product.nombre.toLowerCase().includes(query) ||
        product.categoria.toLowerCase().includes(query)
    );
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

  generateReport() {
    this.productService.generateProductReport().subscribe({
      next: (response) => {
        const now = new Date();
        const formattedDate = `${now.getDate().toString().padStart(2, '0')}-${(now.getMonth() + 1)
          .toString()
          .padStart(2, '0')}-${now.getFullYear()}_${now
            .getHours()
            .toString()
            .padStart(2, '0')}-${now.getMinutes()
              .toString()
              .padStart(2, '0')}-${now.getSeconds().toString().padStart(2, '0')}`;

        const fileName = `Reporte_Productos_${formattedDate}.pdf`;

        console.log('Nombre del archivo generado:', fileName);

        const blob = new Blob([response.body!], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();

        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Error al generar el reporte:', err);
      },
    });
  }
}
