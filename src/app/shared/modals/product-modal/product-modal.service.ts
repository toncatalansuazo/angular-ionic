import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Product } from 'src/app/core/http/product/product.model';
import { ProductModalType } from 'src/app/model/ProductModalType';
import { ProductModalComponent } from './product-modal.component';

@Injectable()
export class ProductModalService {

  constructor(private modalController: ModalController) { }

  async showProductModal(data: { product: Product, mode: ProductModalType }) {
    const modal = await this.modalController.create({
      component: ProductModalComponent, 
      componentProps: data
    });
    return await modal.present();
  }
}
