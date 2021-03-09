import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faThumbsUp, faComments, faShareAlt, faEye } from '@fortawesome/free-solid-svg-icons';
import { Article } from 'src/app/_models/article';

@Component({
  selector: 'app-article-preview',
  templateUrl: './article-preview.component.html',
  styleUrls: ['./article-preview.component.scss']
})
export class ArticlePreviewComponent implements OnInit {
  @Input() article: Article;

  constructor(private router: Router) { }

  faThumbsUp = faThumbsUp;
  faComments = faComments;
  faShareAlt = faShareAlt;
  faEye = faEye;

  ngOnInit(): void {
    this.setRandomLikes();
  }

  setRandomLikes(): void {
    this.article.likes = Math.floor(Math.random() * 100) + 5;
  }

  showDetailedArticle(article: Article): void {
    this.router.navigateByUrl(`/article/${article.title.replace(/[^a-zA-Z]/g, '').substring(0, 10)}`, { state: article });
  }

  userLikedArticle(): void {
    this.article.likes += this.article.userHasLiked ? -1 : 1;
    this.article.userHasLiked = !this.article.userHasLiked;
  }
}
