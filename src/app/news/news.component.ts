import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AppState } from '../app.state';
import { Article } from '../_models/article';
import { Source } from '../_models/source';
import { HandleErrorsService } from '../_services/handle-errors.service';
import { NewsService } from '../_services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  sourcesObservable: Observable<Source[]>;

  constructor(private newsService: NewsService,
              private handleErrorsService: HandleErrorsService,
              private store: Store<AppState>) {
    this.sourcesObservable = this.store.select(state => state.sources);
  }

  language = 'en';
  country = 'us';

  sources: Source[];
  news: Article[];

  loadingNews = true;

  ngOnInit(): void {
    this.sourcesObservable.subscribe(sources => {
      if (sources && sources.length) {
        this.sources = sources;
        this.getRandomSources();
      }
    });
    this.setTitle();
  }

  setTitle(): void {
    this.store.dispatch({
      type: 'SET_TITLE',
      payload: 'News Headlines'
    });
  }

  getRandomSources(): void {
    const randomSourcesIds = [];
    if (this.sources.length > 5) {
      while (randomSourcesIds.length < 5) {
        const randomIndex = Math.floor(Math.random() * (this.sources.length - 1)) + 1;
        if (randomSourcesIds.indexOf(randomIndex) === -1) {
          randomSourcesIds.push(this.sources[randomIndex].id);
        }
      }
    } else {
      this.sources.forEach(source => {
        randomSourcesIds.push(source.id);
      });
    }
    this.getRecentNews(randomSourcesIds.join(','));
  }

  getRecentNews(randomSources: string): void {
    this.loadingNews = true;
    this.newsService.getRandomTopNews(randomSources).subscribe(resp => {
      this.news = resp.articles;
      this.loadingNews = false;
    }, error => {
      this.loadingNews = false;
      this.handleErrorsService.handleNewsError(error);
    });
  }

}
