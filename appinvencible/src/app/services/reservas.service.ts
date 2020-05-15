import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IReserva, MsnAPIReserva } from '../interfaces/ReservasInterface';
import { UsuariosService } from './usuarios.service';

const URL = environment.url;
@Injectable({
  providedIn: 'root'
})
export class ReservasService {
  token: string = '';


  constructor(private http: HttpClient, private uS: UsuariosService) { }

  filtrar(parametros: any): Promise<MsnAPIReserva> {
    const opciones = {
      headers: {
        'x-token': this.uS.token
      }
    };
    const ruta = `${ URL }/reservas/filtrar`;
    console.log(parametros, opciones);
    return new Promise (resolve => {
      this.http.post<MsnAPIReserva>(ruta, {parametros}, opciones)
        .subscribe (respuesta => {
          resolve (respuesta);
          console.log(respuesta)
        })
    })
  }
  new(reserva: IReserva): Promise<MsnAPIReserva> {
    const opciones = {
      headers: {
        'x-token': this.uS.token
      }
    };
    const ruta = `${ URL }/reservas/new`;
    console.log(reserva);
    console.log (opciones);
    return new Promise (resolve => {
      this.http.post<MsnAPIReserva>(ruta, reserva, opciones)
        .subscribe (respuesta => {
          console.log(respuesta);
        })
    });
  }

  getReservas(){
    console.log('reservas');
    return this.http.get(`${ URL }/usuarios/new`);
  }
}
