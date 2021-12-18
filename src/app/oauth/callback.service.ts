import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { INYCUToken } from 'src/models/nycu.token.model';
import { myConfig } from '../config';
@Injectable({
  providedIn: 'root'
})
export class CallbackService {

  constructor(
    private http: HttpClient
  ) { }

  getNYCUAccessToken (code: string) : Observable<any>{
    const requestFormData = new FormData();
    requestFormData.append("grant_type", "authorization_code");
    requestFormData.append("code", code);
    requestFormData.append("client_id", myConfig.LOGIN.client_id);
    requestFormData.append("client_secret", myConfig.LOGIN.client_secret);
    requestFormData.append("redirect_uri", myConfig.LOGIN.redirect_uri);
    return this.http.post(`https://id.nycu.edu.tw/o/token/`, requestFormData);
  }

  postTempNYCUAccessToken(token: INYCUToken) {
    return this.http.post(`${myConfig.ENV.apiBase}/token`,  token);
  }

}
