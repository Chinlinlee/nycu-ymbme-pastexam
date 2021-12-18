import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { TokenService } from 'src/services/token.service';
import { INYCUUser } from '../../models/nycu.user.model';
import { CourseService } from '../../services/course.service';
import { SharedService } from '../../services/shared.service';
import { myConfig } from '../config';
import { ICourse } from '../models/course.model';
import { UploadModalComponent } from '../upload-modal/upload-modal.component';
import { IPastexam } from './pastexam.model';
import { PastexamService } from './pastexam.service';

@Component({
  selector: 'app-pastexam',
  templateUrl: './pastexam.page.html',
  styleUrls: ['./pastexam.page.scss'],
})
export class PastexamPage implements OnInit {

  user: INYCUUser = {
    username: "",
    email: ""
  };
  courseId: number;
  courseName: string;
  courseList: Array<ICourse>;
  course: ICourse;
  pastexamAndNoteList: Array<IPastexam> = [];

  isMobile: boolean = false;

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private courseService: CourseService,
    private sharedService: SharedService,
    private tokenService: TokenService,
    private pastexamService: PastexamService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.activateRoute.paramMap.subscribe({
      next: (params: any) => {
        if (params.params.courseId) {
          this.courseId = params.params.courseId;
        }
      }
    });
    
    this.sharedService.courseItem$.subscribe({
      next: (data)=> {
        if (!(data as Array<any>).length) {
          this.courseService.getAllCourse()
          .subscribe({
            next: (courseData)=> {
              this.sharedService.setCourseItem(courseData);
              this.courseList = courseData;
              this.courseName = this.getCurrentCourseName();
            }
          });
        } else {
          this.courseList = (data as Array<ICourse>);
          this.courseName = this.getCurrentCourseName();
        }
      }
    }).unsubscribe();
    if (!this.courseId) return;
    this.getPastexamList();
    this.sharedService.isUploadFileFinished$.subscribe({
      next : (isUploadFileFinished)=> {
        if (isUploadFileFinished) {
          this.getPastexamList();
        }
      }
    });

    this.sharedService.isMobileItem$.subscribe({
      next: (isMobile) => {
        this.isMobile = isMobile;
      }
    });
  }

  getCurrentCourseName() {
    if (!this.courseId) return null;
    return this.courseList.find(v=> v.courseId == this.courseId).name || null;
  }

  getPastexamList () {
    this.pastexamService.getPastexamByCourseId(this.courseId).subscribe({
      next: (data)=> {
        this.pastexamAndNoteList = data.map(v=> {
          v["isShowMore"] = false;
          return v;
        });
      }
    });
  }

  async onBtnUploadModalClick() {
    const uploadModal = await this.modalController.create({
      component: UploadModalComponent,
      cssClass: "upload-modal"
    });
    await uploadModal.present();
  }

  async onBtnDownloadClick (id:number) {
    this.pastexamService.downloadPastexamByCourse(id).subscribe({
      next:  (data)=> {
        let b = data as Blob;
        console.log(data);
        let downloadUrl = window.URL.createObjectURL(b);
        let link = document.createElement('a');
        link.href = downloadUrl;
        link.target = "_new";
        link.click();
        link.remove();
      }
    });
  }

  async onBtnShowMoreInfoClick(item: IPastexam) {
    item.isShowMore = !item.isShowMore;
  }

  ionViewDidEnter() {
    if (myConfig.ENV.isProduction) {
      this.tokenService.getTokenStatus().subscribe(
        (profile)=> {
          this.user = (profile as INYCUUser);
          this.sharedService.setUserItem(this.user);
        },
        (err) => {
          this.router.navigate(["home"]);
        }
      )
    }
  }

  doRefresh(event) {
    window.location.reload();
  }
  
}
