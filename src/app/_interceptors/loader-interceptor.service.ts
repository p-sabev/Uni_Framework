import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { EmitterService } from '../_services/emitter.service';

@Injectable()
export class LoaderInterceptorService implements HttpInterceptor {
    constructor(private emitterService: EmitterService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.emitterService.showLoader.emit();

        return next.handle(req).pipe(catchError((err) => {
            this.emitterService.hideLoader.emit();
            return throwError(err);
        }))
            .pipe(map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
                if (evt instanceof HttpResponse) {
                    this.emitterService.hideLoader.emit();
                }
                return evt;
            }));
    }
}
