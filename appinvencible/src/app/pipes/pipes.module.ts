import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewImagePipe } from './view-image.pipe';
import { ImagesSanitizerPipe } from './images-sanitizer.pipe';
import { DomSanitizerPipe } from './dom-sanitizer.pipe';

@NgModule({
  declarations: [
    ViewImagePipe,
    ImagesSanitizerPipe,
    DomSanitizerPipe

  ],
  exports: [
    ViewImagePipe,
    ImagesSanitizerPipe,
    DomSanitizerPipe

  ]
})
export class PipesModule { }
