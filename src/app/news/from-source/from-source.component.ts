import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Article } from 'src/app/_models/article';
import { HandleErrorsService } from 'src/app/_services/handle-errors.service';
import { NewsService } from 'src/app/_services/news.service';

@Component({
  selector: 'app-from-source',
  templateUrl: './from-source.component.html',
  styleUrls: ['./from-source.component.scss']
})
export class FromSourceComponent implements OnInit {

  constructor(private newsService: NewsService,
              private route: ActivatedRoute,
              private store: Store<AppState>,
              private handleErrorsService: HandleErrorsService) { }

  sourceName: string;
  articles: Article[];

  loadingNews = true;

  ngOnInit(): void {
    this.subscribeForRootParams();
    this.store.dispatch({
      type: 'SET_TITLE',
      payload: 'Articles'
    });
  }

  subscribeForRootParams(): void {
    this.route.params.subscribe((params: Params) => {
      this.sourceName = params.source;
      if (this.sourceName) {
        this.getArticlesForSource();
      }
    });
  }

  getArticlesForSource(): void {
    this.loadingNews = true;
    this.newsService.getArticlesFromSource(this.sourceName).subscribe(resp => {
      this.articles = resp.articles;
      this.loadingNews = false;
      this.setTitle();
    }, error => {
      this.loadingNews = false;
      this.handleErrorsService.handleNewsError(error);
    });
  }

  setTitle(): void {
    this.store.dispatch({
      type: 'SET_TITLE',
      payload: this.articles[0].source.name
    });
  }

}
