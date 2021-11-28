import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PastexamPage } from './pastexam.page';

const routes: Routes = [
  {
    path: '',
    component: PastexamPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PastexamPageRoutingModule {}
