import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PastexamPageRoutingModule } from './pastexam-routing.module';

import { PastexamPage } from './pastexam.page';
import { TopBarModule } from '../components/top-bar/top-bar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopBarModule,
    PastexamPageRoutingModule
  ],
  declarations: [
    PastexamPage
  ]
})
export class PastexamPageModule {}
