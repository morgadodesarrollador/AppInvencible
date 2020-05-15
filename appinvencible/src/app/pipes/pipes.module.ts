import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewImagePipe } from './view-image.pipe';
import { ImagesSanitizerPipe } from './images-sanitizer.pipe';
import { DomSanitizerPipe } from './dom-sanitizer.pipe';
import { FechasPipe } from './fechas.pipe';

@NgModule({
  declarations: [
    ViewImagePipe,
    ImagesSanitizerPipe,
    DomSanitizerPipe,
    FechasPipe

  ],
  exports: [
    ViewImagePipe,
    ImagesSanitizerPipe,
    DomSanitizerPipe,
    FechasPipe

  ]
})
export class PipesModule { }
