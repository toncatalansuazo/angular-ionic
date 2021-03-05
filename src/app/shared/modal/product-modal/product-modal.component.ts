import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from 'src/app/core/http/product/product.model';
import * as fromUiSelectors from '../../store/ui.selectors';
import * as fromUiReducers from '../../store/ui.reducer';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss'],
})
export class ProductModalComponent implements OnInit {
  product$: Observable<Product>;
  constructor(public modalController: ModalController,
              private store: Store<fromUiReducers.State>) {}

  ngOnInit() {
    this.product$ = this.store.select(fromUiSelectors.selectProductInModal);
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
