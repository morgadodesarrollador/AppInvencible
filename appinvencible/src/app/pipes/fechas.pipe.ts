import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechas'
})
export class FechasPipe implements PipeTransform {

  transform(fecha: string): string {
    const f = new Date(fecha);
    return (f.getDate() + '/' + f.getMonth() + '/' + f.getFullYear() );
  }

}
