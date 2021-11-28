import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class NycuService {

  constructor(
    private http: HttpClient
  ) { }

  getProfile() {
    return this.http.get("https://id.nycu.edu.tw/api/profile/" , {
      headers : {
        "Authorization" : `Bearer ${window.localStorage.getItem("token")}`
      }
    });
  }
}
