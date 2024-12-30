//src/app/products/product-form/product-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProductService } from '../services/product.service';
import { CreateProductCommand, UpdateProductCommand } from '../models/product.models';

@Component({
  standalone: true,
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  productId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      quantity: [0, [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
    });

    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.productId) {
      this.loadProductData();
    }
  }

  loadProductData() {
    this.productService.listProducts().subscribe({
      next: (response) => {
        const product = response.data.find((p) => p.id === this.productId);
        if (product) {
          this.productForm.patchValue({
            name: product.nombre,
            description: product.descripcion,
            price: product.precio,
            quantity: product.cantidad,
            category: product.categoria,
          });
        }
      },
      error: (err) => console.error('Error al cargar producto:', err),
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      const formData = this.productForm.value;
      console.log('Datos enviados al backend:', formData);

      if (this.productId) {
        const updateCommand: UpdateProductCommand = {
          id: this.productId,
          nombre: formData.name,
          descripcion: formData.description,
          precio: formData.price,
          cantidad: formData.quantity,
          categoria: formData.category,
        };

        console.log('Comando de actualización:', updateCommand);

        this.productService.updateProduct(updateCommand).subscribe({
          next: () => this.router.navigate(['/dashboard/products/list']),
          error: (err) => console.error('Error al actualizar producto:', err),
        });
      } else {
        const createCommand: CreateProductCommand = {
          nombre: formData.name,
          descripcion: formData.description,
          precio: formData.price,
          cantidad: formData.quantity,
          categoria: formData.category,
        };

        console.log('Comando de creación:', createCommand);

        this.productService.createProduct(createCommand).subscribe({
          next: () => this.router.navigate(['/dashboard/products/list']),
          error: (err) => console.error('Error al crear producto:', err),
        });
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/dashboard/products/list']);
  }
}
