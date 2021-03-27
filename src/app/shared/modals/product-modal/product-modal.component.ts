import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from 'src/app/core/http/product/product.model';
// import * as fromUiSelectors from '../../../store/ui.selectors';
// import * as fromUiReducers from '../../../store/ui.reducer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fromUiReducers, fromUiSelectors } from '../../store';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss'],
})
export class ProductModalComponent implements OnInit {
  product$: Observable<Product>;
  @Input() mode: string;
  @Input() product: Product;
  productForm: FormGroup;
  constructor(public modalController: ModalController,
              private store: Store<fromUiReducers.State>,
              private formBuilder: FormBuilder) {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      unit: ['', Validators.required]
    });
  }

  ngOnInit() {
    console.log(this.product);
    console.log(this.mode);
    // this.product$ = this.store.select(fromUiSelectors.selectProductInModal);
  }

  onSubmit() {
    console.log(this.productForm.value);
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
