import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopBarComponent } from './top-bar.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [
    TopBarComponent
  ] ,
  exports : [
    TopBarComponent
  ]
})
export class TopBarModule {}
