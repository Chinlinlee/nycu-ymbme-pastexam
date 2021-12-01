import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(
    private webTitle: Title,
    private meta: Meta
  ) { }

  updateTitle(title:string) {
    this.webTitle.setTitle(title);
  }

  updateDescription(description: string) {
    this.meta.updateTag({
      name: "description",
      content: description
    });
  }

}
