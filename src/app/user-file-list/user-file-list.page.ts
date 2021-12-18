import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { timeoutWith } from 'rxjs/operators';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { INYCUUser } from '../../models/nycu.user.model';
import { CourseService } from '../../services/course.service';
import { SharedService } from '../../services/shared.service';
import { TokenService } from '../../services/token.service';
import { myConfig } from '../config';
import { IPastexam } from '../pastexam/pastexam.model';
import { UserFileListService } from './user-file-list.service';

@Component({
  selector: 'app-user-file-list',
  templateUrl: './user-file-list.page.html',
  styleUrls: ['./user-file-list.page.scss'],
})
export class UserFileListPage implements OnInit {


  user: INYCUUser;
  userPastexamAndNoteList: Array<IPastexam>;

  isMobile: boolean = false;

  constructor(
    private router: Router,
    private tokenService: TokenService,
    private sharedService: SharedService,
    private UserFileListService: UserFileListService,
    private courseService: CourseService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.sharedService.isMobileItem$.subscribe({
      next: (isMobile)=> {
        this.isMobile = isMobile;
      }
    });
    if (!myConfig.ENV.isProduction) {
      this.user = {
        username: "1234",
        email: "1234"
      }
    }
    this.getUserPastexamAndNoteList();
    this.sharedService.courseItem$.subscribe({
      next: (data)=> {
        if (!(data as Array<any>).length) {
          this.courseService.getAllCourse()
          .subscribe({
            next: (courseData)=> {
              this.sharedService.setCourseItem(courseData);
            }
          });
        }
      }
    }).unsubscribe();
    this.sharedService.isUploadFileFinished$.subscribe({
      next : (isUploadFileFinished)=> {
        if (isUploadFileFinished) {
          this.getUserPastexamAndNoteList();
        }
      }
    });
  }

  getUserPastexamAndNoteList() {
    this.UserFileListService.getPastexamByUploader(this.user.username).subscribe({
      next: (data)=> {
        this.userPastexamAndNoteList = data.map(v=> {
          v["isShowMore"] = false;
          return v;
        });
      }
    });
  }
  
  onBtnShowMoreInfoClick(pastexam: IPastexam) {
    pastexam.isShowMore = !pastexam.isShowMore;
  }

  async onBtnDeletePastexamClick(pastexam: IPastexam) {
      let result: SweetAlertResult = await Swal.fire({
        title: '您確定嗎?',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText:"確定",
        cancelButtonText: "取消",
        backdrop: false,
        text: `您確定要刪除 ${pastexam.filename} 嗎?`
      });
      if (result.isConfirmed) {
        this.UserFileListService.deletePastexamByUploader(this.user.username, pastexam.uploadedDataId).subscribe({
          next: ()=> {
            this.getUserPastexamAndNoteList();
          }
        })
      }
  }

  ionViewDidEnter() {
    if (myConfig.ENV.isProduction) {
      this.tokenService.getTokenStatus().subscribe(
        (profile)=> {
          this.user = (profile as INYCUUser);
          this.sharedService.setUserItem(this.user);
          this.UserFileListService.getPastexamByUploader(this.user.username).subscribe({
            next: (userFileList)=> {
              this.userPastexamAndNoteList = userFileList;
            }
          })
        },
        (err) => {
          this.router.navigate(["home"]);
        }
      )
    }
  }
}
