import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { myConfig } from '../config';
import { IPastexam } from '../pastexam/pastexam.model';

@Injectable({
  providedIn: 'root'
})
export class UserFileListService {

  constructor(
    private http: HttpClient
  ) { }
  
  getPastexamByUploader (uploader: string) {
    return this.http.get<Array<IPastexam>>(`${myConfig.ENV.apiBase}/uploaded-data/uploader/${uploader}`);
  }

  deletePastexamByUploader (uploader: string ,uploadedDataId: number) {
    return this.http.delete(`${myConfig.ENV.apiBase}/uploaded-data/uploader/${uploader}/${uploadedDataId}`, {
      observe: 'response'
    });
  }

}
