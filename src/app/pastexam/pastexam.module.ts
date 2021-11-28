import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PastexamPageRoutingModule } from './pastexam-routing.module';

import { PastexamPage } from './pastexam.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PastexamPageRoutingModule
  ],
  declarations: [PastexamPage]
})
export class PastexamPageModule {}
