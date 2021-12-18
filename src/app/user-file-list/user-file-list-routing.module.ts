import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserFileListPage } from './user-file-list.page';

const routes: Routes = [
  {
    path: '',
    component: UserFileListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserFileListPageRoutingModule {}
