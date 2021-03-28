import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ProductResponse } from 'src/app/core/http/product/product.model';
import { ProductService } from 'src/app/core/http/product/product.service';
import { fromUiActions, fromUiReducers } from 'src/app/shared/store';
import * as fromProductActions from './product.action';


@Injectable()
export class ProductEffects {
  
  loading$ = createEffect(() => this.actions$.pipe(
    ofType(fromProductActions.getProducts),
    map(fromUiActions.startLoadingProgressBar)
  ));

  stopLoading$ = createEffect(() => this.actions$.pipe(
    ofType(fromProductActions.getProductsSuccess),
    map(fromUiActions.stopLoadingProgressBar)
  ));

  getOrders$ = createEffect(() => this.actions$.pipe(
    ofType(fromProductActions.getProducts),
    switchMap(() => {
      return this.productService.getProducts().pipe(
        map((res: ProductResponse) => fromProductActions.getProductsSuccess({ products: res.data}) ),
        catchError(err => of(err))
      );
    })
  ));

  updateProduct$ = createEffect(() => this.actions$.pipe(
    ofType(fromProductActions.updateProduct),
    switchMap(({ product }) => {
      return this.productService.updateProduct(product).pipe(
        map((res: ProductResponse) => fromProductActions.updateProductSuccess({ product: res.data[0]}) ),
        catchError(err => of(err))
      );
    })
  ));

  constructor(private actions$: Actions,
    private productService: ProductService,
    private store: Store<fromUiReducers.State>) {}
}
