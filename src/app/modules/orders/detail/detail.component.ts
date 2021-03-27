import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Destroyer } from 'src/app/utils/Destroyer';
import { first } from 'rxjs/operators';
import { Order } from '../order.model';
import * as fromOrder from '../store/order.reducer';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/core/http/product/product.model';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Payment } from 'src/app/core/http/payment/payment.model';
import { fromOrderAction, fromOrderSelectors } from '../store';
import { fromUiActions, fromUiSelectors } from 'src/app/shared/store';
import { ProductModalType } from 'src/app/model/ProductModalType';
import { FromOrdersRouteType } from '../OrderRoute';
import { DeliveryInfo } from 'src/app/core/http/order/order.model';
import { ProductModalService } from 'src/app/shared/modals/product-modal/product-modal.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent extends Destroyer implements OnInit {
  private orderId: number;
  order$: Observable<Order| undefined>;
  products$: Observable<Product[]>;
  payment$: Observable<Payment>;
  deliveryFG: FormGroup;
  isLoadingProgBar$: Observable<boolean>;
  fromRoute: FromOrdersRouteType;
  highlighted: number[]= [];

  constructor(private activatedRoute: ActivatedRoute,
              private store: Store<fromOrder.OrderState>,
              private router: Router,
              private formGroup: FormBuilder,
              private prodModalSrv: ProductModalService) {
    super();
    this.createTransportForm();
    this.setUpDeliveryForm();
    this.getOriginNavigation();
    this.isLoadingProgBar$ = this.store.select(fromUiSelectors.getIsLoadingProgressBar);
  }

  getOriginNavigation() {
    this.activatedRoute.queryParams.pipe(
      first(),
    ).subscribe((params: Params) => this.fromRoute = params.fromRoute);
  }

  
  ngOnInit() {
    this.order$ = this.store.select(fromOrderSelectors.getSelectedOrder);
    this.orderId = this.activatedRoute.snapshot.params.id;
    this.products$ = this.store.select(fromOrderSelectors.getProductsInOrder, { id: this.orderId });
    this.fetchProductsInOrder();
    this.fetchOrderPayment();
    this.listenPayment();
  }

  onHighlight(product: Product) {
    const productId = product.id;
    const index = this.highlighted.findIndex(id => id === productId)
    if (index === -1) {
      this.highlighted = [...this.highlighted, productId];
    } else {
      this.highlighted.splice(index,1);
    }
    

  }
  
  onPrepared() {
    this.store.dispatch(fromOrderAction.setOrderAsPrepared());
  }

  onSetDelivery() {
    const deliveryInfo: DeliveryInfo = this.deliveryFG.value;
    if (this.comesFromPendingRoute(this.fromRoute)) {
      // bug call html function
      this.store.dispatch(fromOrderAction.setDeliveryInfoToPendingOrder({ deliveryInfo }));
    }
    if (this.comesFromToDeliverRoute(this.fromRoute)) {
      // bug call html function
      this.store.dispatch(fromOrderAction.setDeliveryInfoToToDeliverOrder({ deliveryInfo }));
    }
  }
  
  showImage(product: Product, $event: MouseEvent): void {
    $event.stopPropagation();
    this.prodModalSrv.showProductModal({product, mode: ProductModalType.DETAIL_IN_ORDER});
    // this.store.dispatch(fromUiActions.showProductInModal({ product, mode: ProductModalType.DETAIL_IN_ORDER }));
  }

  navigateBack() {
    this.activatedRoute.queryParams.pipe(
      first(),
      ).subscribe((params: Params) => this.router.navigate([params.fromRoute]));
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
  
  private createTransportForm() {
    this.deliveryFG = new FormGroup({
      deliveryId: new FormControl('', [Validators.required, Validators.min(1)]),
      deliveryName: new FormControl('', [Validators.required, Validators.min(1)])
    });
  }
    
  private comesFromPendingRoute(route: FromOrdersRouteType): boolean {
    return FromOrdersRouteType.PENDING === route;
  }
  
  private comesFromToDeliverRoute(route: FromOrdersRouteType): boolean {
    return FromOrdersRouteType.TO_DELIVER === route;
  }

  private setUpDeliveryForm() {
    this.deliveryFG = this.formGroup.group({
      deliveryId: ['', [Validators.required]],
      deliveryName: ['', [Validators.required, Validators.pattern('Tur Bus/Starken|TNT|Pullman Cargo|Otro')]]
    });
  }
}
