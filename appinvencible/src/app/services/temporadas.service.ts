import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ITemporada, MsnAPITemporada } from '../interfaces/TemporadasInterface';
import { UsuariosService } from './usuarios.service';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class TemporadasService {
  token: string = '';
  
  constructor(private http: HttpClient, private uS: UsuariosService) { }
  
  getTemporada(year: number): Promise<MsnAPITemporada>{
    const opciones = {
      headers: {
        'x-token': this.uS.token
      }
    }
    const ruta = `${ URL }/temporada/listar`;
    return new Promise (resolve => {
      this.http.post<MsnAPITemporada>(ruta, {year}, opciones)
        .subscribe (respuesta => {
          //console.log(respuesta);
          resolve(respuesta);
        })
    });
  }

  new(temporada: ITemporada): Promise<MsnAPITemporada> {
    const opciones = {
      headers: {
        'x-token': this.uS.token
      }
    };
    const ruta = `${ URL }/temporada/new`;
    console.log(temporada);
    console.log (opciones);
    return new Promise (resolve => {
      this.http.post<MsnAPITemporada>(ruta, temporada, opciones)
        .subscribe (respuesta => {
          console.log(respuesta);
        })
    });
  }
}
