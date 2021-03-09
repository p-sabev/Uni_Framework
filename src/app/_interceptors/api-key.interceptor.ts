import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes('newsapi') && environment && environment.newsApiKey) {
      request = request.clone({
        setHeaders: {
          'X-Api-Key': environment.newsApiKey
        }
      });
    }

    return next.handle(request);
  }
}
