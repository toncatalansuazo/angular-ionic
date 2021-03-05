import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import { Product } from 'src/app/core/http/product/product.model';
import { ProductModalType } from 'src/app/model/ProductModalType';
import { ProductModalComponent } from '../modal/product-modal/product-modal.component';
import * as fromUiActions from './ui.actions';

@Injectable()
export class UIEffects {
  private loading;
  async presentLoading({
    cssClass = 'my-custom-class',
    message = 'Please wait...',
    duration = 6000
  }) {
    this.loading = await this.loadingController.create({ 
        cssClass,
        message,
        duration
      });
    await this.loading.present();
  }

  async stopLoadingModal() {
    await this.loading.dismiss();
  }

  async showProductModal(data: { product: Product, mode: ProductModalType }) {
    const modal = await this.modalController.create({
      component: ProductModalComponent, 
      componentProps: data
    });
    return await modal.present();
  }

  showProductInModal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUiActions.showProductInModal),
      tap((params) => {
        this.showProductModal({ product: params.product, mode: params.mode });
      })
    )
  , { dispatch: false });

  loadingModal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUiActions.startLoadingModal),
      tap(({ cssClass, message, duration }) => {
        this.presentLoading({
          cssClass,
          message,
          duration
        });
      })
    )
  , { dispatch: false });

  stopLoadingModal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUiActions.stopLoadingModal),
      tap(() => this.stopLoadingModal())
    )
  , { dispatch: false });
  

  constructor(
    private modalController: ModalController,
    private actions$: Actions,
    private router: Router,
    private loadingController: LoadingController) {}
}