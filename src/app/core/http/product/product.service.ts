import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigurationEndpoint } from 'src/app/configuration/configuration-endpoint';
import { Product, ProductResponse } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  get url(): string {
    return ConfigurationEndpoint.getProductsEndpoint();
  }

  getProducts(): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(this.url);
  }

  constructor(private http: HttpClient) { }
}
