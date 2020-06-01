import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ITemporada, MsnAPITemporada } from '../interfaces/TemporadasInterface';
import { UsuariosService } from './usuarios.service';
import { Storage } from '@ionic/storage';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class TemporadasService {
  token: string = '';
  
  constructor(private http: HttpClient, private uS: UsuariosService, private storage: Storage) { }
  
  getTemporada(year: number): Promise<MsnAPITemporada>{
    console.log(year);
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

  async saveTemporadasStorage(datos: any){
    await this.storage.set('temporadas', datos); // almacenamos el token
  }

  getTemporadasStorage(item: string) {
    return this.storage.get(item);
  }


  new(temporada: ITemporada, idTemp?: number): Promise<MsnAPITemporada> {
    const opciones = {
      headers: {
        'x-token': this.uS.token
      }
    };
    let ruta = `${ URL }/temporada/new`;
    console.log(temporada);
    console.log (opciones);
    if (temporada.item == null){
      return new Promise (resolve => {
        this.http.post<MsnAPITemporada>(ruta, temporada, opciones)
          .subscribe (respuesta => {
            console.log(respuesta);
          })
      });
    } else {
      ruta = `${ URL }/temporada/edit`;
      console.log(ruta);
      return new Promise (resolve => {
        this.http.post<MsnAPITemporada>(ruta, temporada, opciones)
          .subscribe (respuesta => {
            console.log(respuesta)
          })
      }) 
    }
  }
}
