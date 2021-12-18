import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { myConfig } from "../app/config";
import { ICourse } from "../app/models/course.model";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

    constructor(
        private http: HttpClient
    ) {}
    
    getTempToken(): Observable<any> {
        return this.http.get<any>(`${myConfig.ENV.apiBase}/token`);
    }

    getTokenStatus() {
        return this.http.get(`${myConfig.ENV.apiBase}/token/check`);
    }

    deleteSession() {
        return this.http.delete(`${myConfig.ENV.apiBase}/token/logout`);
    }
}
