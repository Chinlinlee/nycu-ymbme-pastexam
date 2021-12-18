import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { myConfig } from '../config';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private menuController: MenuController
  ) {
    this.menuController.enable(false, "menu-content");
  }

  onGotoLoginClick() {
    const params = [
      `client_id=${myConfig.LOGIN.client_id}`,
      `response_type=code`,
      `scope=profile`
    ]
    let oAuthUrl = `https://id.nycu.edu.tw/o/authorize/?${params.join("&")}`;
    window.location.href = oAuthUrl;
  }
}
