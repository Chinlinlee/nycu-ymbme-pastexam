import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { loginConfig } from '../login.config';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {}

  onGotoLoginClick() {
    const params = [
      `client_id=${loginConfig.client_id}`,
      `response_type=code`,
      `scope=profile`
    ]
    let oAuthUrl = `https://id.nycu.edu.tw/o/authorize/?${params.join("&")}`;
    window.location.href = oAuthUrl;
  }
}
