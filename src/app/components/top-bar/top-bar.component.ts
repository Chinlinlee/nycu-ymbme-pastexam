import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { MenuController, ModalController, PopoverController } from '@ionic/angular';
import { filter } from 'rxjs/operators/';
import { UploadModalComponent } from 'src/app/upload-modal/upload-modal.component';
import { UserPopoverComponent } from '../user-popover/user-popover.component';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {
  title: string = "";
  isMobile: boolean = false;
  isMainPage: boolean = false;
  myUserPopover: HTMLIonPopoverElement;
  constructor(
    private router: Router,
    private webTitle: Title,
    private menuController: MenuController,
    private modalController: ModalController,
    private popoverController: PopoverController
  ) {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((event) => {
      this.isMainPage = false;
      if (this.router.url != "/home") {
        this.isMainPage = true;
      }
      this.title = this.webTitle.getTitle();
    })
  }

  ngOnInit() { }

  async sideMenuPresent() {
    this.menuController.open('myMenu');
  }

  async onBtnUploadModalClick() {
    const uploadModal = await this.modalController.create({
      component: UploadModalComponent,
      cssClass: "upload-modal"
    });
    await uploadModal.present();
  }

  async onBtnUserPopoverClick(event: any) {
    this.myUserPopover = await this.popoverController.create({
      component: UserPopoverComponent,
      event: event,
      translucent: true
    });
    return await this.myUserPopover.present();
  }
  async userPopoverDismiss() {
    if (this.myUserPopover) {
      await this.myUserPopover.dismiss();
      this.myUserPopover = null;
    }
  }
}
