import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TouchSequence } from 'selenium-webdriver';
import { NycuService } from 'src/services/nycu.service';
import { INYCUUser } from '../../models/nycu.user.model';

@Component({
  selector: 'app-pastexam',
  templateUrl: './pastexam.page.html',
  styleUrls: ['./pastexam.page.scss'],
})
export class PastexamPage implements OnInit {

  user : INYCUUser = {
    username : "",
    email: ""
  };
  constructor(
    private route: Router,
    private cdr: ChangeDetectorRef,
    private nycuService: NycuService
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.nycuService.getProfile().subscribe(
      (data: INYCUUser) => {
        this.user = data;
        this.cdr.detectChanges();
      },
      (err) => {
        this.route.navigate(["home"]);
      }
    )
  }
}
