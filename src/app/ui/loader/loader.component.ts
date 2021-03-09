import { Component, Input, OnInit } from '@angular/core';
import { EmitterService } from 'src/app/_services/emitter.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  constructor(private emitterService: EmitterService) { }
  show: boolean;

  ngOnInit(): void {
    this.subscribeForLoaderEvents();
  }

  subscribeForLoaderEvents(): void {
    this.emitterService.showLoader.subscribe(() => {
      this.show = true;
    });
    this.emitterService.hideLoader.subscribe(() => {
      this.show = false;
    });
  }

}
