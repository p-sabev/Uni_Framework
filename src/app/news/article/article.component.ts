import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { faThumbsUp, faComments, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  constructor(private location: Location,
              private store: Store<AppState>,
              private router: Router) { }

  faThumbsUp = faThumbsUp;
  faComments = faComments;
  faShareAlt = faShareAlt;

  article: any;

  ngOnInit(): void {
    const state = this.location.getState();
    if (state && state.hasOwnProperty('source') && state.hasOwnProperty('title')) {
      this.article = state;
      this.setTitle();
    } else {
      this.router.navigate(['/news']);
    }
  }

  setTitle(): void {
    this.store.dispatch({
      type: 'SET_TITLE',
      payload: `${this.article.source.name} article`
    });
  }

  userLikedArticle(): void {
    this.article.likes += this.article.userHasLiked ? -1 : 1;
    this.article.userHasLiked = !this.article.userHasLiked;
  }

}
