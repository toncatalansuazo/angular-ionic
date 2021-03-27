import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { OrderService } from 'src/app/core/http/order/order.service';
import * as fromOrderSelectors from './order.selectors';
import { Order, OrdersResponse, OrderResponse } from '../order.model';
import { OrderRoute } from '../OrderRoute';
import * as fromOrderAction from './order.action';
import * as fromOrderReducer from './order.reducer';
import { Store } from '@ngrx/store';
import { ProductResponse } from 'src/app/core/http/product/product.model';
import { PaymentService } from 'src/app/core/http/payment/payment.service';
import { PaymentResponse } from 'src/app/core/http/payment/payment.model';
import { fromUiActions } from 'src/app/shared/store';
import { DeliveryInfoResponse } from 'src/app/core/http/order/order.model';

@Injectable()
export class OrderEffects {
  private selectedOrder: Observable<Order| undefined> = this.store.select(fromOrderSelectors.getSelectedOrder);

  getOrders$ = createEffect(() => this.actions$.pipe(
      ofType(fromOrderAction.pendingOrders),
      switchMap(() => {
        return this.orderService.getPendingOrder().pipe(
          map((res: OrdersResponse) => fromOrderAction.pendingOrdersSuccess({ orders: res.data}) ),
          catchError(err => of(err))
        );
      })
  ));

  // ui action to show laoding
  loading$ = createEffect(() => this.actions$.pipe(
    ofType(fromOrderAction.pendingOrders,
      fromOrderAction.getProducts,
      fromOrderAction.getPayment,
      fromOrderAction.getCompleted,
      fromOrderAction.getToDeliver,
      fromOrderAction.setOrderAsPrepared,
      fromOrderAction.setDeliveryInfoToToDeliverOrder,
      fromOrderAction.setDeliveryInfoToPendingOrder),
    map(fromUiActions.startLoadingProgressBar)
  ));

  stopLoading$ = createEffect(() => this.actions$.pipe(
    ofType(fromOrderAction.pendingOrdersSuccess,
      fromOrderAction.pendingOrdersFail,
      fromOrderAction.getProductsSuccess,
      fromOrderAction.getProductsFail,
      fromOrderAction.getPaymentSuccess,
      fromOrderAction.getPaymentFail,
      fromOrderAction.getCompletedSuccess,
      fromOrderAction.getCompletedFail,
      fromOrderAction.getToDeliverSuccess,
      fromOrderAction.getToDeliverFail,
      fromOrderAction.setOrderAsPreparedSuccess,
      fromOrderAction.setOrderAsPreparedFail,
      fromOrderAction.setDeliveryInfoToToDeliverOrderSuccess,
      fromOrderAction.setDeliveryInfoToPendingOrderSuccess
      ),
    map(fromUiActions.stopLoadingProgressBar)
  ));

  selectOrder$ = createEffect(() => this.actions$.pipe(
    ofType(fromOrderAction.selectOrder),
    tap(({ order, fromRoute }) => this.router.navigate([`${OrderRoute.ORDERS}/${OrderRoute.DETAIL}/${order.id}`], { queryParams: {fromRoute: `${OrderRoute.ORDERS}${fromRoute}` } }))
  ), { dispatch: false });

  getProductsInOrder$ = createEffect(() => this.actions$.pipe(
    ofType(fromOrderAction.getProducts),
    mergeMap(() => this.selectedOrder),
    exhaustMap((order: Order| undefined) => this.orderService.getProductsInOrder(order && order.id).pipe(
      map((res: ProductResponse) => fromOrderAction.getProductsSuccess({ orderId: order && order.id, products: res.data})),
      catchError((err) => of(err))
    ))
  ));

  getPayment$ = createEffect(()  => this.actions$.pipe(
    ofType(fromOrderAction.getPayment),
    mergeMap(() => this.selectedOrder),
    exhaustMap((order: Order| undefined) => this.paymentService.getPayment(order && order.id).pipe(
      map((res: PaymentResponse) => fromOrderAction.getPaymentSuccess({ orderId: order && order.id, payment: res.data})),
      catchError((err) => of(err))
    ))
  ));

  getCompleted$ = createEffect(()  => this.actions$.pipe(
    ofType(fromOrderAction.getCompleted),
    exhaustMap(() => this.orderService.getCompletedOrders().pipe(
      map((res: OrdersResponse) => fromOrderAction.getCompletedSuccess({ orders: res.data})),
      catchError((err) => of(err))
    ))
  ));

  getToDeliver$ = createEffect(()  => this.actions$.pipe(
    ofType(fromOrderAction.getToDeliver),
    switchMap(() => this.orderService.getOrdersToDeliver().pipe(
      map((res: OrdersResponse) => fromOrderAction.getToDeliverSuccess({ orders: res.data })),
      catchError((err) => of(err))
    ))
  ));

  getPrepared$ = createEffect(()  => this.actions$.pipe(
    ofType(fromOrderAction.getPrepared),
    exhaustMap(() => this.orderService.getOrderPrepared().pipe(
      map((res: OrdersResponse) => fromOrderAction.getPreparedSuccess({ orders: res.data})),
      catchError((err) => of(err))
    ))
  ));

  setOrderPrepared$ = createEffect(()  => this.actions$.pipe(
    ofType(fromOrderAction.setOrderAsPrepared),
    mergeMap(() => this.selectedOrder),
    exhaustMap((order: Order| undefined) => this.orderService.setOrderAsPrepared(order).pipe(
      map((res: OrderResponse) => fromOrderAction.setOrderAsPreparedSuccess({ order: res.data })),
      catchError((err) => of(err))
    ))
  ));
  
  setDeliveryInfoToPendingOrder$ = createEffect(() => this.actions$.pipe(
    ofType(fromOrderAction.setDeliveryInfoToPendingOrder),
    withLatestFrom(this.selectedOrder),
    exhaustMap(([params, order]: [any, Order| undefined]) => this.orderService.setDeliveryInfo(order && order.id, params.deliveryInfo).pipe(
      tap(() => console.log('setDeliveryInfoToPendingOrder')),
      map((res: DeliveryInfoResponse) =>
        fromOrderAction.setDeliveryInfoToPendingOrderSuccess({order, deliveryInfo: params.deliveryInfo})),
      catchError((err) => of(err))
    ))
  ));

  setDeliveryInfoToOrderToDeliver$ = createEffect(() => this.actions$.pipe(
    ofType(fromOrderAction.setDeliveryInfoToToDeliverOrder),
    withLatestFrom(this.selectedOrder),
    exhaustMap(([params, order]: [any, Order| undefined]) => this.orderService.setDeliveryInfo(order && order.id, params.deliveryInfo).pipe(
      tap(() => console.log('setDeliveryInfoToOrderToDeliver')),
      map((res: DeliveryInfoResponse) =>
        fromOrderAction.setDeliveryInfoToToDeliverOrderSuccess({order, deliveryInfo: params.deliveryInfo})),
      catchError((err) => of(err))
    ))
  ));

  constructor(private actions$: Actions,
              private orderService: OrderService,
              private router: Router,
              private store: Store<fromOrderReducer.OrderState>,
              private paymentService: PaymentService) {
  }
}
