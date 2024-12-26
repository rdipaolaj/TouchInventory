import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
  imports: [CommonModule, FormsModule],
})
export class ProductFormComponent implements OnInit {
  productId: number | null = null;
  name: string = '';
  price: number = 0;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.productId) {
      // Simular carga de datos
      this.name = 'Producto Ejemplo';
      this.price = 100;
    }
  }

  onSubmit() {
    if (this.productId) {
      console.log('Actualizando producto:', this.productId, this.name, this.price);
    } else {
      console.log('Creando producto:', this.name, this.price);
    }
    // Redireccionar a la lista
    this.router.navigate(['/products/list']);
  }
}