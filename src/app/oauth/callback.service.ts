import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { INYCUToken } from 'src/models/nycu.token.model';
import { loginConfig } from '../login.config';


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
    requestFormData.append("client_id", loginConfig.client_id);
    requestFormData.append("client_secret", loginConfig.client_secret);
    requestFormData.append("redirect_uri", loginConfig.redirect_uri);
    return this.http.post(`https://id.nycu.edu.tw/o/token/`, requestFormData);
  }

}
