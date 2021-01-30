import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { merge, of } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { OrderService } from 'src/app/core/http/order/order.service';
import * as fromOrderSelectors from './order.selectors';
import { OrderResponse } from '../order.model';
import { OrderRoute } from '../OrderRoute';
import * as fromOrderAction from './order.action';
import * as fromOrderReducer from './order.reducer';
import { Store } from '@ngrx/store';
import { OrderRow } from '../order-row';
import { ProductResponse } from 'src/app/core/http/product/product.model';

@Injectable()
export class OrderEffects {
  getOrders$ = createEffect(() => this.actions$.pipe(
      ofType(fromOrderAction.pendingOrders),
      switchMap(() => {
        return this.orderService.getPendingOrder().pipe(
          map((res: OrderResponse) => fromOrderAction.pendingOrdersSuccess({ orders: res.data}) ),
          catchError(err => of(err))
        );
      })
  ));

  selectOrder$ = createEffect(() => this.actions$.pipe(
    ofType(fromOrderAction.selectOrder),
    tap(() => this.router.navigate([`${OrderRoute.ORDERS}/${OrderRoute.DETAIL}`]))
  ), { dispatch: false });

  getProductsInOrder$ = createEffect(() => this.actions$.pipe(
    ofType(fromOrderAction.getProducts),
    mergeMap(() => this.store.select(fromOrderSelectors.getSelectedOrder)),
    exhaustMap((orderRow: OrderRow) => this.orderService.getProductsInOrder(orderRow.id).pipe(
      map((res: ProductResponse) => fromOrderAction.getProductsSuccess({ products: res.data})),
      catchError((err) => err)
    ))
    // tap(() => this.router.navigate([`${OrderRoute.ORDERS}/${OrderRoute.DETAIL}`]))
  ), { dispatch: false });
  // fromOrderAction.selectOrder

  constructor(private actions$: Actions,
              private orderService: OrderService,
              private router: Router,
              private store: Store<fromOrderReducer.OrderState>) {
  }
}
