import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { UploadModalComponent } from './upload-modal.component';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';




@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    NgSelectModule,
    FormsModule
  ],
  declarations: [
    UploadModalComponent
  ] ,
  exports : [
    UploadModalComponent
  ]
})
export class UploadModalModule {}
