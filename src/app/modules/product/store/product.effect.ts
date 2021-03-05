import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ProductResponse } from 'src/app/core/http/product/product.model';
import { ProductService } from 'src/app/core/http/product/product.service';
import { fromUiActions } from 'src/app/shared/store';
import * as fromProductActions from './product.action';

@Injectable()
export class ProductEffects {
  

  getOrders$ = createEffect(() => this.actions$.pipe(
    ofType(fromProductActions.getProducts),
    switchMap(() => {
      return this.productService.getProducts().pipe(
        map((res: ProductResponse) => fromProductActions.getProductsSuccess({ products: res.data}) ),
        catchError(err => of(err))
      );
    })
  ));

  // setProductSelected$ = createEffect(() => this.actions$.pipe(
  //   ofType(fromProductActions.setProductSelected),
  //   map((params) => fromUiActions.showProductInModal({ product: params.product }))
  // ));

  constructor(private actions$: Actions, private productService: ProductService) {}
}
