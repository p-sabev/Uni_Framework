import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './ui/header/header.component';
import { SidebarComponent } from './ui/sidebar/sidebar.component';
import { FooterComponent } from './ui/footer/footer.component';
import { LoaderComponent } from './ui/loader/loader.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiKeyInterceptor } from './_interceptors/api-key.interceptor';
import { NewsComponent } from './news/news.component';
import { FromSourceComponent } from './news/from-source/from-source.component';
import { ArticleComponent } from './news/article/article.component';
import { ArticlePreviewComponent } from './news/article-preview/article-preview.component';
import { SharedModule } from './_shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoaderInterceptorService } from './_interceptors/loader-interceptor.service';
import { ShareModule } from 'ngx-sharebuttons';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { StoreModule } from '@ngrx/store';
import { addSourcesReducer } from './_reducers/sources.reducer';
import { setTitleReducer } from './_reducers/appTitle.reducer';
import { HelloPipe } from './_pipes/hello.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    NewsComponent,
    FromSourceComponent,
    ArticleComponent,
    ArticlePreviewComponent,
    LoaderComponent,
    HelloPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    SharedModule,
    ShareModule,
    SnotifyModule,
    StoreModule.forRoot({sources: addSourcesReducer, appTitle: setTitleReducer})
  ],
  providers: [
    {
      provide: 'SnotifyToastConfig',
      useValue: ToastDefaults
    },
    SnotifyService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiKeyInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
