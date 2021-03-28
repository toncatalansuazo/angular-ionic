import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from 'src/app/core/http/product/product.model';
// import * as fromUiSelectors from '../../../store/ui.selectors';
// import * as fromUiReducers from '../../../store/ui.reducer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fromUiReducers, fromUiSelectors } from '../../store';
import { ProductModalType } from 'src/app/model/ProductModalType';
import { ConfirmOpt } from 'src/app/model/modals/confirm-opt';
import { fromProductActions, fromProductReducer } from 'src/app/modules/product/store';
import { AlertConfirmService } from '../../alerts/alert-confirm.service';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss'],
})
export class ProductModalComponent implements OnInit {
  @Input() mode: string;
  @Input() product: Product;
  productForm: FormGroup;
  product$: Observable<Product>;
  showForm: boolean;

  constructor(public modalController: ModalController,
              private formBuilder: FormBuilder,
              private store: Store<fromProductReducer.State>,
              private alertService: AlertConfirmService) {
  }

  
  ngOnInit() {
    this.setUpProductFG();
    console.log(this.product);
    console.log(this.mode);
    // this.product$ = this.store.select(fromUiSelectors.selectProductInModal);
  }
  
  /**
   * show/hide form to edit product
   * if mode === ProductModalType.DETAIL_IN_ORDER doesn't show modal
   */
  showFormProduct() {
    this.showForm = this.mode === ProductModalType.DETAIL_IN_ORDER;
  }
  
  onSubmit() {
    const values: Product = {...this.product, ...this.productForm.value};
    const changedValues = this.checkChangedValues(values);
    const opts: ConfirmOpt = new ConfirmOpt('Edición producto',
                                            this.product.name,
                                            `Esta seguro de cambiar el producto ${this.product.name}, a $${values.price} cada ${values.unit}? ${changedValues}`,
                                            () => this.store.dispatch(fromProductActions.updateProduct({ product: values }))
                                            );
    this.alertService.showConfirmModal(opts);
  }

  /**
   * @param values from form product
   * @return changed attributes by the user
   */ 
  checkChangedValues(values: Product): string {
    let changesVal: string[] = [];
    if (values.name !== this.product.name)
      changesVal.push(`NOMBRE a ${ values.name }`);
    if (values.price !== this.product.price) 
      changesVal.push(`PRECIO a ${ values.price }`);
    if (values.stock !== this.product.stock)
      changesVal.push(`STOCK a ${ values.stock }`);
    if (values.unit !== this.product.unit)
      changesVal.push(`unidad a ${values.unit}`);
    if (changesVal.length === 0) {
      return `No ha cambiado ningun valor`;
    }
    return `Cambiara ${changesVal.join(', ')}`;
  }

  // reset form to original product values
  onReset() {
    this.setUpProductFG();
  }
  
  onDismiss() {
    this.modalController.dismiss();
  }

  private setUpProductFG() {
    this.productForm = this.formBuilder.group({
      name: [this.product.name, Validators.required],
      price: [this.product.price, Validators.required],
      unit: [this.product.unit, Validators.required],
      stock: [this.product.stock, Validators.required]
    });
  }
}
