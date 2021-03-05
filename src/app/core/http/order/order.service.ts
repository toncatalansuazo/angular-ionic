import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigurationEndpoint } from 'src/app/configuration/configuration-endpoint';
import { Observable } from 'rxjs';
import { OrdersResponse, Order, DeliveryInfo, OrderResponse } from 'src/app/modules/orders/order.model';
import { ProductResponse } from '../product/product.model';
import { DeliveryInfoResponse } from './order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  get url(): string {
    return ConfigurationEndpoint.getOrdersEndpoint();
  }

  get urlDelivery(): string {
    return ConfigurationEndpoint.getPaymentEndpoint();
  }

  get orderUrl(): string {
    return ConfigurationEndpoint.getOrderEndpoint();
  }

  constructor(private http: HttpClient) { }

  getCompletedOrders(): Observable<OrdersResponse> {
    return this.http.get<OrdersResponse>(`${this.url}/completed`);
  }

  getPendingOrder(): Observable<OrdersResponse> {
    return this.http.get<OrdersResponse>(`${this.url}/pending`);
  }

  getOrdersToDeliver(): Observable<OrdersResponse> {
    return this.http.get<OrdersResponse>(`${this.url}/to-deliver`);
  }

  getProductsInOrder(id: number): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.orderUrl}/products/${id}`);
  }

  getOrderPrepared() {
    return this.http.get<OrdersResponse>(`${this.url}/prepared`);
  }

  setDeliveryInfo(orderId: string, deliveryInfo: DeliveryInfo): Observable<DeliveryInfoResponse> {
    return this.http.put<DeliveryInfoResponse>(`${this.urlDelivery}/order/${orderId}`, deliveryInfo);
  }

  setOrderAsPrepared(order): Observable<OrderResponse> {
    return this.http.put<OrderResponse>(`${this.orderUrl}`, {order});
  }
}
