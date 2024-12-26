import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Product {
  id: number;
  name: string;
  price: number;
}

@Component({
  standalone: true,
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  imports: [CommonModule],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  ngOnInit() {
    // Simulando datos de prueba
    this.products = [
      { id: 1, name: 'Producto A', price: 10 },
      { id: 2, name: 'Producto B', price: 20 },
      { id: 3, name: 'Producto C', price: 30 },
    ];
  }

  onDelete(productId: number) {
    console.log('Eliminar producto con ID:', productId);
    this.products = this.products.filter(p => p.id !== productId);
  }
}