import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { myConfig } from '../config';
import { ICourse } from '../models/course.model';
import { IPastexam } from './pastexam.model';

@Injectable({
  providedIn: 'root'
})
export class PastexamService {

  constructor(
    private http: HttpClient
  ) { }

  getCourseById(id:number) {
    return this.http.get<ICourse>(`${myConfig.ENV.apiBase}/course/${id}`);
  }

  getPastexamByCourseId (id: number) {
    return this.http.get<Array<IPastexam>>(`${myConfig.ENV.apiBase}/uploaded-data?courseId=${id}`);
  }

  downloadPastexamByCourse(id: number) {
    return this.http.get(`${myConfig.ENV.apiBase}/uploaded-data/download/${id}`, {
      responseType: "blob" as "json"
    });
  }
}
