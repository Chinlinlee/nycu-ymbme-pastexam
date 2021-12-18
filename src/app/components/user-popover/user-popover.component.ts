import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { INYCUUser } from 'src/models/nycu.user.model';
import { SharedService } from 'src/services/shared.service';
import { TokenService } from 'src/services/token.service';

@Component({
  selector: 'app-user-popover',
  templateUrl: './user-popover.component.html',
  styleUrls: ['./user-popover.component.scss'],
})
export class UserPopoverComponent implements OnInit {
  user: INYCUUser = null;
  constructor(
    private sharedService: SharedService,
    private tokenService: TokenService,
    public popoverController: PopoverController,
    private router: Router
  ) { }

  ngOnInit() {
    this.sharedService.userItem$.subscribe({
      next : (oUser) => {
        this.user = oUser;
      }
    });
  }

  async logout() {
    this.tokenService.deleteSession().subscribe({
      next: (res)=> {
        this.router.navigateByUrl(`/home`);
      }
    });
    await this.dismiss();
  }

  async dismiss() {
    await this.popoverController.dismiss();
  }

  async navigateToUserFileList() {
    this.router.navigateByUrl("/user-file-list");
    await this.popoverController.dismiss();
  }

}
