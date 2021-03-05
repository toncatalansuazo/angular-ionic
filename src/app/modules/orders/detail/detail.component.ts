import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Destroyer } from 'src/app/utils/Destroyer';
import { OrderService } from 'src/app/core/http/order/order.service';
import { first, map, tap } from 'rxjs/operators';
import { DeliveryInfo, Order } from '../order.model';
import * as fromOrder from '../store/order.reducer';
import { Store } from '@ngrx/store';
import { Product, ProductResponse } from 'src/app/core/http/product/product.model';
import { Observable } from 'rxjs';
import { PaymentService } from 'src/app/core/http/payment/payment.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Payment, PaymentResponse } from 'src/app/core/http/payment/payment.model';
import { fromOrderAction, fromOrderReducer, fromOrderSelectors } from '../store';
import { fromProductActions } from '../../product/store';
import { fromUiActions, fromUiSelectors } from 'src/app/shared/store';
import { ProductModalType } from 'src/app/model/ProductModalType';
import { IonItemSliding } from '@ionic/angular';

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
  isLoadingProgBar$: Observable<boolean>;

  constructor(private activatedRoute: ActivatedRoute,
              private store: Store<fromOrder.OrderState>,
              private router: Router,
              private formGroup: FormBuilder) {
    super();
    this.createFormTransport();
    this.setUpDeliveryForm();
    this.isLoadingProgBar$ = this.store.select(fromUiSelectors.getIsLoadingProgressBar);
  }

  private setUpDeliveryForm() {
    this.deliveryFG = this.formGroup.group({
      deliveryId: ['', [Validators.required]],
      deliveryName: ['', [Validators.required, Validators.pattern('Tur Bus/Starken|TNT|Pullman Cargo')]]
    });
    // throw new Error('Method not implemented.');
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
    this.store.dispatch(fromOrderAction.setOrderAsPrepared());
  }

  onSetDelivery() {
    const deliveryInfo: DeliveryInfo = this.deliveryFG.value;
    console.log({deliveryInfo});
  }

  showImage(product: Product): void {
    this.store.dispatch(fromUiActions.showProductInModal({ product, mode: ProductModalType.DETAIL_IN_ORDER }));
  }

  navigateBack() {
    this.activatedRoute.queryParams.pipe(
      first(),
    ).subscribe((params: Params) => this.router.navigate([params.back]));
  }

  private listenPayment(): void {
    this.payment$ = this.store.select(fromOrderSelectors.getPaymentOrder,  { id: this.orderId });
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
