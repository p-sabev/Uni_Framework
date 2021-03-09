import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  getRandomTopNews(randomSources: string): Observable<any> {
    return this.http.get(`/newsapi/top-headlines?sources=${randomSources}`);
  }

  getSources(language: string, country: string): Observable<any> {
    return this.http.get(`/newsapi/sources?language=${language}&country=${country}`);
  }

  getArticlesFromSource(source: string): Observable<any> {
    return this.http.get(`/newsapi/top-headlines?sources=${source}`);
  }
}
