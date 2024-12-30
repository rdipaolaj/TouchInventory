// src/app/products/services/product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateProductCommand, UpdateProductCommand, ProductResponse } from '../models/product.models';
import { ApiResponse } from '../../shared/models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:5212/touch/product/api/v1/Product';
  private notificationsUrl = 'http://localhost:5212/touch/notifications/api/v1/Notification';
  private reportUrl = 'http://localhost:5212/touch/reports/api/v1/Report/generate-product-report';

  constructor(private http: HttpClient) {}

  listProducts(): Observable<ApiResponse<ProductResponse[]>> {
    return this.http.get<ApiResponse<ProductResponse[]>>(`${this.baseUrl}/list-products`);
  }

  createProduct(product: CreateProductCommand): Observable<ApiResponse<ProductResponse>> {
    return this.http.post<ApiResponse<ProductResponse>>(`${this.baseUrl}/create-product`, product);
  }

  updateProduct(product: UpdateProductCommand): Observable<ApiResponse<boolean>> {
    return this.http.put<ApiResponse<boolean>>(`${this.baseUrl}/update-product`, product);
  }

  deleteProduct(productId: number): Observable<ApiResponse<boolean>> {
    return this.http.delete<ApiResponse<boolean>>(`${this.baseUrl}/delete-product/${productId}`);
  }

  sendLowStockNotifications(): Observable<ApiResponse<boolean>> {
    return this.http.post<ApiResponse<boolean>>(`${this.notificationsUrl}/force-notifications`, {});
  }

  generateProductReport(): Observable<HttpResponse<Blob>> {
    return this.http.get(this.reportUrl, {
      responseType: 'blob',
      observe: 'response',
    });
  }
}