import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  hackmdUrl : SafeResourceUrl;
  constructor(
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.hackmdUrl = this.domSanitizer.bypassSecurityTrustResourceUrl("https://hackmd.io/@nycuChinlinMD/rJTP0535Y");
  }

}
