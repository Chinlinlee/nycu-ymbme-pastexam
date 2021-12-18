import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  myLoadingElement: HTMLIonLoadingElement
  constructor(
    private loadingController: LoadingController
  ) { }

  async present(message: string) {
    this.myLoadingElement = await this.loadingController.create({
      message: message
    });
    await this.myLoadingElement.present();
  }

  async dismiss() {
    let topLoader = await this.loadingController.getTop();
    while (topLoader) {
      await this.loadingController.dismiss();
      topLoader = await this.loadingController.getTop();
    }
  }
}
