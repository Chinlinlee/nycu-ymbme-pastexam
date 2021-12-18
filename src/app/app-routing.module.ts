import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'oauth/callback',
    loadChildren: () => import('./oauth/callback/callback.module').then( m => m.CallbackPageModule)
  },
  {
    path: 'pastexam',
    loadChildren: () => import('./pastexam/pastexam.module').then( m => m.PastexamPageModule)
  },
  {
    path: 'pastexam/:courseId',
    loadChildren: () => import('./pastexam/pastexam.module').then( m => m.PastexamPageModule)
  },
  {
    path: 'user-file-list',
    loadChildren: () => import('./user-file-list/user-file-list.module').then( m => m.UserFileListPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
