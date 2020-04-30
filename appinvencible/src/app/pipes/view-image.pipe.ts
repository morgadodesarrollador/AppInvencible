import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

const URL = environment.url;

@Pipe({
  name: 'viewImage'
})

export class ViewImagePipe implements PipeTransform {

  transform(img: string, userId: string): string {
    console.log (`${ URL }/usuarios/imagen/${ userId }/${ img }`);
    return `${ URL }/usuarios/imagen/${ userId }/${ img }`;
  }

}
