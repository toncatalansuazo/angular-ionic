import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IonicModule,
    HttpClientModule,
    NgxDatatableModule
  ],
  exports: [
    CommonModule,
    IonicModule,
    HttpClientModule,
    NgxDatatableModule]
})
export class TestCoreModule { }
