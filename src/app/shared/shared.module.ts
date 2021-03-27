import { NgModule } from '@angular/core';
import { HeaderTemplateComponent } from './ui/header-template/header-template.component';
import { ItemComponent } from './ui/item/item.component';

import { PivotPipe } from './pipes/pivot.pipe';
// import { ProductModalComponent } from './modals/product-modal/product-modal.component';
import { CommonModule } from '@angular/common';
import { DragDropDirective } from './decorators/drag-drop.directive';
import { ProductReadyDirective } from './decorators/product-ready/product-ready.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProductModalComponent } from './modals/product-modal/product-modal.component';

@NgModule({
  declarations: [
    HeaderTemplateComponent,
    ItemComponent,
    PivotPipe,
    DragDropDirective,
    ProductReadyDirective,
    ProductModalComponent
  ],
  imports: [
    IonicModule,
    // CommonModule,
    // FormsModule,
    // ReactiveFormsModule
  ],
  exports: [
    HeaderTemplateComponent,
    ItemComponent,
    PivotPipe,
    CommonModule,
    ProductReadyDirective,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    ProductModalComponent
  ],
  providers: []
})
export class SharedModule {
  constructor() {}
}
