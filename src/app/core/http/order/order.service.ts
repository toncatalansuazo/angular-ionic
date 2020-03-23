import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigurationEndpoint } from 'src/app/configuration/configuration-endpoint';
import { Observable } from 'rxjs';
import { OrderResponse, Order } from 'src/app/modules/orders/order.model';
import { ProductResponse } from '../product/product.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  get url(): string {
    return ConfigurationEndpoint.getOrdersEndpoint();
  }

  get orderUrl(): string {
    return ConfigurationEndpoint.getOrderEndpoint();
  }

  constructor(private http: HttpClient) { }

  getCompletedOrders(): Observable<OrderResponse> {
    return this.http.get<OrderResponse>(`${this.url}/completed`);
  }

  getPendingOrder(): Observable<OrderResponse> {
    return this.http.get<OrderResponse>(`${this.url}/pending`);
  }

  getOrdersToDeliver(): Observable<OrderResponse> {
    return this.http.get<OrderResponse>(`${this.url}/prepared`);
  }

  getProductsInOrder(id): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.orderUrl}/products/${id}`);
  }

  getOrderPrepared() {
    return null;
  }

  setTransportOrder() {
    return null;
  }

  setOrderAsPrepared() {
    return null;
  }
}
