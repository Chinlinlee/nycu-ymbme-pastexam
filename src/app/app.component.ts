import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SeoService } from 'src/services/seo.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  disableSplitPane: boolean = false;
  routePathDescription = {
    "/home" : {
      title: "陽明醫工考古題",
      description: "提供陽明醫工系上傳、參考考古題的系統"
    },
    "oauth/callback": {
      title: "陽明醫工考古題 | OAuth",
      description: "陽明醫工考古題OAuth登入頁面"
    },
    "/pastexam" : {
      title: "陽明醫工考古題 | 主頁面",
      description: ""
    }
  }
  constructor(
    private router: Router,
    private seoService: SeoService
  ) {
    if (this.router.url == "/") {
      this.disableSplitPane = true;
    }
    this.router.events.pipe(
      filter((e)=> e instanceof NavigationEnd)
    )
    .subscribe((e: NavigationEnd)=> {
      if(_.get(this.routePathDescription, e.url, false)) {
        this.seoService.updateTitle(this.routePathDescription[e.url].title);
        this.seoService.updateDescription(this.routePathDescription[e.url].description);
      }
      if(e.url =="/home") {
        this.disableSplitPane = true;
      }
    });
  }
}
