import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { faHome } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  faHome = faHome;
  showSidebar: boolean;
  appTitle: Observable<string>;

  constructor(private store: Store<AppState>) {
    this.appTitle = this.store.select(state => state.appTitle);
  }

  ngOnInit(): void {
  }

}
