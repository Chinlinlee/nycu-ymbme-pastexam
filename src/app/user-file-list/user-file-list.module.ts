import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserFileListPageRoutingModule } from './user-file-list-routing.module';

import { UserFileListPage } from './user-file-list.page';
import { TopBarModule } from '../components/top-bar/top-bar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserFileListPageRoutingModule,
    TopBarModule
  ],
  declarations: [UserFileListPage]
})
export class UserFileListPageModule {}
