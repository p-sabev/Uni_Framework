import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyImgDirective } from '../_directives/lazy-img.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LazyImgDirective
  ],
  providers: [],
  exports: [
    LazyImgDirective
  ]
})

export class SharedModule { }
