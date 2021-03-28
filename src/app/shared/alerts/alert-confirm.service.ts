import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ConfirmOpt } from 'src/app/model/modals/confirm-opt';

@Injectable({
  providedIn: 'root'
})
export class AlertConfirmService {

  constructor(private alertController: AlertController) { }

  async showConfirmModal(optConfirm: ConfirmOpt): Promise<void> {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: optConfirm.title,
      subHeader: optConfirm.subtitle,
      message: optConfirm.description,
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
        handler: optConfirm.cancelFunction
      }, {
        text: 'Confirmar',
        handler: optConfirm.confirmFunction
      }]
    });

    return await alert.present();
  }
}
