import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderTemplateComponent } from './header-template.component';

@NgModule({
  declarations: [HeaderTemplateComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [HeaderTemplateComponent]
})
export class HeaderTemplateModule { }
