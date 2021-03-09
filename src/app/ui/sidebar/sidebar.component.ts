import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Article } from 'src/app/_models/article';
import { Source } from 'src/app/_models/source';
import { HandleErrorsService } from 'src/app/_services/handle-errors.service';
import { NewsService } from 'src/app/_services/news.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() show: boolean;
  @Output() sidebarClosed: EventEmitter<any> = new EventEmitter();

  constructor(private newsService: NewsService,
              private router: Router,
              private handleErrorsService: HandleErrorsService,
              private store: Store<AppState>) { }

  language = 'en';
  country = 'us';

  sources: Source[];

  ngOnInit(): void {
    this.getAllSources();
  }

  hideSidebar(): void {
    this.show = false;
    this.sidebarClosed.emit(this.show);
  }

  goToSourceNews(sourceId: string, sourceName: string): void {
    this.router.navigate([`/news/${sourceId}`]);
    this.hideSidebar();
  }

  getAllSources(): void {
    this.newsService.getSources(this.language, this.country).subscribe(resp => {
      this.sources = resp.sources;
      this.setSourcesInState(this.sources);
    }, error => {
      this.handleErrorsService.handleNewsError(error);
    });
  }

  setSourcesInState(sources: Source[]): void {
    this.store.dispatch({
      type: 'ADD_SOURCES',
      payload: sources as Source[]
    });
  }
}
