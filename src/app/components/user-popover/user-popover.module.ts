import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { UserPopoverComponent } from './user-popover.component';



@NgModule({
  declarations: [
    UserPopoverComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    UserPopoverComponent
  ]
})
export class UserPopoverModule { }
