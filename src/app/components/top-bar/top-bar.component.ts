import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { filter } from 'rxjs/operators/';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {
  title : string = "";
  constructor(
    private router: Router,
    private webTitle: Title,
    private menuController: MenuController
  ) { 
    this.router.events.pipe(
      filter(e=> e instanceof NavigationEnd)
    ).subscribe(()=> {
      this.title = this.webTitle.getTitle();
    })
  }

  ngOnInit() {}

  async sideMenuPresent() {
    this.menuController.open('myMenu');
  }

}
