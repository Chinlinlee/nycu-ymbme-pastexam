import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { myConfig } from "../app/config";
import { ICourse } from "../app/models/course.model";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

    constructor(
        private http: HttpClient
    ) {}
    
    getAllCourse(): Observable<Array<ICourse>> {
        return this.http.get<Array<ICourse>>(`${myConfig.ENV.apiBase}/course`);
    }
}
