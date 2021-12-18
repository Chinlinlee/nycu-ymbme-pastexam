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
        this.activateRoute.queryParams.subscribe(params => {
            if (params.code) {
                this.callbackService.getNYCUAccessToken(params.code).subscribe(
                    (resData: INYCUToken) => {
                        if (resData) {
                            this.callbackService.postTempNYCUAccessToken(resData).subscribe({
                                next: (res)=> {
                                    this.route.navigate(['pastexam']);
                                },
                                error: (err) => {
                                    this.route.navigate(['home']);
                                }
                            });
                        } else {
                            console.error("missing token data");
                            this.route.navigate(['home']);
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
