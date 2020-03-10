import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigurationEndpoint } from 'src/app/configuration/configuration-endpoint';
import { Observable } from 'rxjs';
import { OrderResponse } from 'src/app/modules/orders/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  get url(): string {
    return ConfigurationEndpoint.getOrdersEndpoint();
  }

  constructor(private http: HttpClient) { }

  getCompletedOrders(): Observable<OrderResponse> {
    return this.http.get<OrderResponse>(`${this.url}/completed`);
  }

  getPendingOrder() {
    return null;
  }

  getPreparedOrder() {
    return null;
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
