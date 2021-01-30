import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Destroyer } from 'src/app/utils/Destroyer';
import { OrderService } from 'src/app/core/http/order/order.service';
import { map, tap } from 'rxjs/operators';
import { DeliveryInfo, Order } from '../order.model';
import * as fromOrder from '../store/order.reducer';
import { Store } from '@ngrx/store';
import { Product, ProductResponse } from 'src/app/core/http/product/product.model';
import { Observable } from 'rxjs';
import { PaymentService } from 'src/app/core/http/payment/payment.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Payment, PaymentResponse } from 'src/app/core/http/payment/payment.model';
import { fromOrderAction, fromOrderReducer, fromOrderSelectors } from '../store';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent extends Destroyer implements OnInit {
  private orderId: number;
  order$: Observable<Order>;
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
    // this.store.select(fromOrderReducer.getSelectedOrder);
    this.order$ = this.store.select(fromOrderSelectors.getSelectedOrder);
    this.orderId = this.activatedRoute.snapshot.params.id;
    this.products$ = this.store.select(fromOrderSelectors.getProductsInOrder, { id: this.orderId });
    this.fetchProductsInOrder();
    this.fetchOrderPayment();
    this.listenPayment();
  }

  onPrepared() {
  }

  onSetDelivery() {
    const deliveryInfo: DeliveryInfo = this.deliveryFG.value;
  }

  private listenProductInOrder(orderId: string) {
  }

  private listenPayment(): void {
    this.payment$ = this.store.select(fromOrderSelectors.getPaymentOrder,  { id: this.orderId }).pipe(
      tap(console.log)
    );
  }

  private fetchProductsInOrder(): void {
    this.store.dispatch(fromOrderAction.getProducts());
  }

  private fetchOrderPayment(): void {
    this.store.dispatch(fromOrderAction.getPayment());
  }

  private createFormTransport() {
    this.deliveryFG = new FormGroup({
      deliveryId: new FormControl('', [Validators.required, Validators.min(1)]),
      deliveryName: new FormControl('', [Validators.required, Validators.min(1)])
    });
  }
}
