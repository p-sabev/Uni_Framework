import { EventEmitter, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EmitterService {
    public showLoader: EventEmitter<any> = new EventEmitter();
    public hideLoader: EventEmitter<any> = new EventEmitter();
}
