import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Destroyer } from 'src/app/utils/Destroyer';
import { OrderService } from 'src/app/core/http/order/order.service';
import { map } from 'rxjs/operators';
import { DeliveryInfo } from '../order.model';
import * as fromOrder from '../store/order.reducer';
import { Store } from '@ngrx/store';
import { Product, ProductResponse } from 'src/app/core/http/product/product.model';
import { Observable } from 'rxjs';
import { OrderRow } from '../order-row';
import { SetProductsInOrderAction, SetPaymentOrderAction } from '../store/orders.action';
import { PaymentService } from 'src/app/core/http/payment/payment.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Payment, PaymentResponse } from 'src/app/core/http/payment/payment.model';



@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent extends Destroyer implements OnInit {
  order: OrderRow;
  products$: Observable<Product[]>;
  payment$: Observable<Payment>;
  deliveryFG: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
              private store: Store<fromOrder.State>,
              private orderService: OrderService,
              private paymentService: PaymentService) {
    super();
    this.createFormTransport();
   }

  ngOnInit() {
    this.activatedRoute.params
      .pipe(this.closeOnDestroy$()).subscribe(
        params => {
          this.order = JSON.parse(params.order);
          this.fetchOrder(this.order.id);
          this.fetchPayment(this.order.id);
          this.listenProductInOrder(this.order.id);
          this.listenPayment();
      });
  }

  onPrepared() {
    this.orderService.setOrderAsPrepared(this.order)
      .pipe(
        this.closeOnDestroy$(),
        map(response => response.success)
      ).subscribe((res) => {
        if (res) {
          this.order.delivered = 1;
        }
      });
  }

  onSetDelivery() {
    const deliveryInfo: DeliveryInfo = this.deliveryFG.value;
    this.orderService.setDeliveryInfo(this.order.id, deliveryInfo);
  }

  private listenProductInOrder(orderId: string) {
    this.products$ = this.store.select(fromOrder.getOrderInProducts)
      .pipe(this.closeOnDestroy$());
  }

  private listenPayment(): void {
    this.payment$ = this.store.select(fromOrder.getPaymentOrder)
      .pipe(
        this.closeOnDestroy$()
      );
  }

  private fetchOrder(id: string): void {
    this.orderService.getProductsInOrder(id)
      .pipe(this.closeOnDestroy$())
      .subscribe((productResponse: ProductResponse) => {
        this.store.dispatch(new SetProductsInOrderAction(productResponse.data));
      });
  }

  private fetchPayment(id: string): void {
    this.paymentService.getPayment(id)
      .subscribe((resPayment: PaymentResponse) => {
        const payment: Payment = resPayment.data;
        this.store.dispatch(new SetPaymentOrderAction(payment));
      });
  }

  private createFormTransport() {
    this.deliveryFG = new FormGroup({
      deliveryId: new FormControl('', [Validators.required, Validators.min(1)]),
      deliveryName: new FormControl('', [Validators.required, Validators.min(1)])
    });
  }
}
