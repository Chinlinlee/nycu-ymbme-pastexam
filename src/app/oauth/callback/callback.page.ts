import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { INYCUToken } from 'src/models/nycu.token.model';
import { CallbackService } from '../callback.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.page.html',
  styleUrls: ['./callback.page.scss'],
})
export class CallbackPage implements OnInit {

  constructor(
    private activateRoute: ActivatedRoute,
    private route: Router,
    private callbackService: CallbackService
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.activateRoute.queryParams.subscribe(params=> {
      if(params.code) {
        this.callbackService.getNYCUAccessToken(params.code).subscribe(
          (resData : INYCUToken)=> {
            if (resData) {
              console.log(resData);
              window.localStorage.setItem("token" , resData.access_token);
              this.route.navigate(['pastexam']);
            } else {
              console.error("missing token data");
              this.route.navigate(['pastexam']);
            }
          },
          (err) => {
            console.error(err);
            this.route.navigate(['home']);
          }
        );
      }
    });
  }

  

}
