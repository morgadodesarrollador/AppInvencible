import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechas'
})
export class FechasPipe implements PipeTransform {
  meses = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
  transform(fecha: string): string {
    const f = new Date(fecha);
    return (this.meses[f.getMonth()] + '/' + f.getDate() + '/' + f.getFullYear() );
  }

}
