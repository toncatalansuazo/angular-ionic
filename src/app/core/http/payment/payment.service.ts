import { Injectable } from '@angular/core';
import { ConfigurationEndpoint } from 'src/app/configuration/configuration-endpoint';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  get url(): string {
    return ConfigurationEndpoint.getPaymentEndpoint();
  }
  constructor(private http: HttpClient) { }

  getPayment(orderId: string): Observable<PaymentResponse> {
    return this.http.get<PaymentResponse>(`${this.url}/${orderId}`);
  }
}
