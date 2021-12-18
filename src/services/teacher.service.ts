import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { myConfig } from "../app/config";
import { Injectable } from '@angular/core';
import { ITeacher } from "src/app/models/teacher.model";

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

    constructor(
        private http: HttpClient
    ) {}
    
    getAllTeacher(): Observable<Array<ITeacher>> {
        return this.http.get<Array<ITeacher>>(`${myConfig.ENV.apiBase}/teacher`);
    }
}
