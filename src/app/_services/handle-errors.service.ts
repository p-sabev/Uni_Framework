import { Injectable } from '@angular/core';
import { SnotifyService } from 'ng-snotify';

@Injectable({
  providedIn: 'root'
})
export class HandleErrorsService {

  constructor(private notification: SnotifyService) { }

  handleNewsError(error): void {
    if (error.error && error.error.message) {
      this.notification.error(error.error.message, error.statusText);
    } else if (error.message) {
      this.notification.error(error.message, error.statusText);
    } else {
      this.notification.error('General error', 'Error');
    }
  }
}
