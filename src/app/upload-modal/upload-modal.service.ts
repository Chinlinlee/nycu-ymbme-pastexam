import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { myConfig } from '../config';

@Injectable({
  providedIn: 'root'
})
export class UploadModalService {

  constructor(
    private http: HttpClient
  ) { }

  public postFormData (formData: FormData) {
    return this.http.post(`${myConfig.ENV.apiBase}/uploaded-data`, formData, {
      reportProgress : true,
      observe: "events"
    }).pipe(
      map(event => this.getHttpEventMessage(event))
    );
  }

  public getHttpEventMessage(event: HttpEvent<any>) {
    if (event.type == HttpEventType.UploadProgress) {
      return this.fileUploadProgress(event);
    } else if (event.type == HttpEventType.Response) {
      return event.body;
    } else {
      return `http event : ${event.type}`;
    }
  }

  private fileUploadProgress (event:any) {
    const percentDoneNum = (event.loaded / event.total);
    const percentDone = (event.loaded / event.total).toFixed(2);
    return { progress: percentDone, progressNum: percentDoneNum };
  }
}
