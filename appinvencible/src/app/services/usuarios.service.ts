import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';
import { IUsario, ILogin, MsnAPIUser } from '../interfaces/UsuarioInterface';
import { Observable } from 'rxjs';
import { resolve } from 'url';

const URL = environment.url;
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  token: string = '';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  };
  ruta: string = '';
  data: any;
  constructor(private http: HttpClient, private storage: Storage) { }

  register( datosRegistro: IUsario): Promise<MsnAPIUser> {
    const ruta = `${ URL }/usuarios/new`;
    const data = datosRegistro;
    return new Promise( resolve => {
      this.http.post<MsnAPIUser>(ruta, data)
        .subscribe (respuesta => {
          if (respuesta.ok) {
            this.saveToken(respuesta.token);
            resolve (respuesta);
          } else { // no se crea el registro
            this.token = null;
            this.storage.clear();
            resolve(respuesta);
          }
        });
    })
  }

  login( datosLogin: ILogin ): Promise<MsnAPIUser> {
    const email = datosLogin.email;
    const password = datosLogin.password;
    const data = { email, password };
    const ruta = `${ URL }/usuarios/login`;
    console.log(ruta, data);

    return new Promise( resolve => {
      this.http.post <MsnAPIUser>( ruta, data )
        .subscribe(respuesta => {
          if ( respuesta.ok ){                // respuesta['ok']
            this.saveToken (respuesta.token); // respuesta['token']
            resolve (respuesta);
          } else {                            // intento fallido
            this.token = null;
            this.storage.clear();
            resolve (respuesta);
          }
        })
    })
  }
  
  getUsuarios(){
    console.log('usuarios');
    return this.http.get(`${ URL }/usuarios/new`);
  }
  // async es para que retorne una promesa
  async saveToken(token: string) {
    this.token = token;
    // await: Esperamos (bloqueo) hasta que token se haya almacenado en el storage y al app no siga
    await this.storage.set('token', token); // almacenamos el token
  }

  
}