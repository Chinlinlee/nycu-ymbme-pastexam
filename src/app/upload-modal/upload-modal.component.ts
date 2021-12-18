import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { INYCUUser } from 'src/models/nycu.user.model';
import Swal from 'sweetalert2';
import { SharedService } from '../../services/shared.service';
import { myConfig } from '../config';
import { ICourse } from '../models/course.model';
import { IUploadForm, IUploadProgressResponse } from './upload-modal.model';
import { UploadModalService } from './upload-modal.service';

@Component({
  selector: 'app-upload-modal',
  templateUrl: './upload-modal.component.html',
  styleUrls: ['./upload-modal.component.scss'],
})
export class UploadModalComponent implements OnInit {

  semNo: Array<number> = [
    110,
    109,
    108,
    107,
    106,
    105,
    104,
    103,
    102,
    101,
    100,
    1111
  ];
  selectedSemNo: number;

  category: Array<string> = [
    "筆記",
    "期中考",
    "期末考",
    "第一次考試",
    "第二次考試",
    "第三次考試",
    "第四次考試",
    "小考"
  ];
  selectedCategory: string;

  courseList: Array<ICourse>;
  selectedCourse: ICourse;

  teacherList: Array<string>;
  selectedTeacher: Array<string> = [];

  formData : FormData;
  selectedFile: File;

  isFileUploadRegionActive: boolean = false;
  acceptableExtensions: Array<string> = ["jpg", "png", "pdf", "zip"];

  description: string;

  uploadRes : IUploadProgressResponse = {
    progress: 0,
    progressNum: 0,
    semNo: 0,
    category: "",
    teachersName: "",
    uploadedDataId: 0,
    uploader: "",
    createdAt: "",
    updatedAt: "",
  };

  user: INYCUUser;
  
  constructor(
    private modalController: ModalController,
    private sharedService: SharedService,
    private uploadModalService: UploadModalService,
    private cdr: ChangeDetectorRef
  ) { 
    
  }

  ngOnInit() {
    this.sharedService.courseItem$.subscribe({
      next: (course)=> {
        this.courseList = (course as Array<ICourse>);
      },
      error: (err)=> {
        console.error(err);
      }
    });

    this.formData = new FormData();
    this.formData.append("semNo" , "");
    this.formData.append("uploader", "");
    this.formData.append("teachersName", this.selectedTeacher.join("、"));
    this.formData.append("courseId" , "");
    this.formData.append("category" , "");
    this.formData.set("description" , "");
    this.formData.append("file", "");
    let nowSem = new Date().getFullYear() - 1911;
    this.semNo = [];
    for (let i = 105 ; i<= nowSem ; i++) {
      this.semNo.unshift(i);
    }
    this.semNo.push(1111);
    this.sharedService.userItem$.subscribe({
      next: (user:INYCUUser )=> {
        this.user = user;
      }
    })
  }

  onSelectedCourseChange(): void {
    this.clearSelectedTeacher();
    this.teacherList = this.selectedCourse.teachers.split("、");
  }

  modalDismiss() {
    this.modalController.dismiss();
  }

  clearSelectedTeacher () {
    this.selectedTeacher = [];
  }

  onBtnCancelSelectedFile() {
    this.selectedFile = null;
    this.formData.set("file", null);
  }
  onBtnUploadClick() {
    if (!this.selectedFile) {
      const myToast = Swal.mixin({
        toast: true,
        position: "top-start",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false
      });
      myToast.fire({
        title: "請選擇檔案"
      });
      return;
    }
    let formValue: IUploadForm = {
      semNo: this.selectedSemNo ,
      uploader: this.user.username,
      teachersName: this.selectedTeacher.join("、"),
      courseId: this.selectedCourse.courseId ,
      category: this.selectedCategory,
      description: this.description,
      file: this.selectedFile
    };
    if (!myConfig.ENV.isProduction) formValue.uploader = "1234";
    this.formData.set("semNo" , String(formValue.semNo));
    this.formData.set("uploader", formValue.uploader);
    this.formData.set("teachersName" , formValue.teachersName);
    this.formData.set("courseId" , String(formValue.courseId));
    this.formData.set("category" , formValue.category);
    this.formData.set("description" , formValue.description);
    this.formData.set("file" , formValue.file);
    this.uploadModalService.postFormData(this.formData).subscribe({
      next: (res) => {
        this.uploadRes = res;
        if (this.uploadRes.semNo) {
          Swal.fire({
            icon: 'success',
            text: "上傳成功"
          })
          this.selectedFile = null;
          this.modalDismiss();
        }
        this.sharedService.setIsUploadFileFinished(true);
        this.cdr.detectChanges();
      },
      error: (err) => {
        Swal.fire({
          icon: "error",
          text: "上傳失敗，如再發生請聯絡作者"
        })
        console.error(err);
      }
    });
  }

  onDragOver(event: UIEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isFileUploadRegionActive = true;
  }

  onDragLeave(event: UIEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isFileUploadRegionActive = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isFileUploadRegionActive = false;
    let droppedFile: File = event.dataTransfer.files[0];
    let extName =droppedFile.name.split(".").pop();
    if (!this.acceptableExtensions.includes(extName)) {
      const myToast = Swal.mixin({
        toast: true,
        position: "top-start",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false
      });
      myToast.fire({
        icon: "error",
        title: "不支援的檔案格式"
      });
      return;
    }
    this.selectedFile = droppedFile;
    
  }
  onSelectedFile(event: any) {
    let files = (event.target as HTMLInputElement).files;
    if ( files.length == 1 ) {
      let extName =files[0].name.split(".").pop();
      if (!this.acceptableExtensions.includes(extName)) {
        const myToast = Swal.mixin({
          toast: true,
          position: "top-start",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false
        });
        myToast.fire({
          icon: "error",
          title: "不支援的檔案格式"
        });
        return;
      }
      this.selectedFile = files[0];
    }
  }

  ionViewDidEnter() {
    this.uploadRes.progress = 0;
  }

}
