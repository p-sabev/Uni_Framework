import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleComponent } from './news/article/article.component';
import { FromSourceComponent } from './news/from-source/from-source.component';
import { NewsComponent } from './news/news.component';
import {AuthGuard} from './_guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/news',
    pathMatch: 'full'
  },
  {
    path: 'news',
    component: NewsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'news/:source',
    component: FromSourceComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'article/:articleName',
    component: ArticleComponent
  },
  {
    path: '**',
    redirectTo: '/news'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
