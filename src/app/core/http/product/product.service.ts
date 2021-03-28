import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigurationEndpoint } from 'src/app/configuration/configuration-endpoint';
import { Product, ProductResponse } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  get urlProducts(): string {
    return ConfigurationEndpoint.getProductsEndpoint();
  }
  get urlProduct(): string {
    return ConfigurationEndpoint.getProductEndpoint();
  }

  getProducts(): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(this.urlProducts);
  }

  updateProduct(product: Product): Observable<ProductResponse> {
    return this.http.put<ProductResponse>(this.urlProduct, product);
  }

  constructor(private http: HttpClient) { }
}
