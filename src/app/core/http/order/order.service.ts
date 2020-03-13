import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigurationEndpoint } from 'src/app/configuration/configuration-endpoint';
import { Observable } from 'rxjs';
import { OrderResponse } from 'src/app/modules/orders/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  get url(): string {
    return ConfigurationEndpoint.getOrdersEndpoint();
  }

  constructor(private http: HttpClient) { }

  getCompletedOrders(): Observable<OrderResponse> {
    return this.http.get<OrderResponse>(`${this.url}/completed`);
  }

  getPendingOrder(): Observable<OrderResponse> {
    return this.http.get<OrderResponse>(`${this.url}/pending`);
  }

  getOrdersToDeliver() {
    return this.http.get<OrderResponse>(`${this.url}/prepared`);
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
