import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';
import { IUsario, ILogin, MsnAPIUser } from '../interfaces/UsuarioInterface';
import { Observable, Subject } from 'rxjs';
import { resolve } from 'url';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

const URL = environment.url;
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  usuario: IUsario;
  token: string = '';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      // tslint:disable-next-line: max-line-length
      'Access-Control-Allow-Headers': 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'
    })
  };
  ruta: string = '';
  data: any;
  // tslint:disable-next-line: deprecation
  constructor(private http: HttpClient, private storage: Storage, private fileT: FileTransfer ) { }

  public enviarUsuarioSubject = new Subject<IUsario>();
  public enviarUsuarioObservable = this.enviarUsuarioSubject.asObservable();

  public enviarUsuario(){
    this.enviarUsuarioSubject.next(this.usuario);
  }

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
    console.log(ruta, datosLogin);

    return new Promise( resolve => {
      this.http.post <MsnAPIUser>( ruta, datosLogin )
        .subscribe(respuesta => {
          if ( respuesta.ok ){                // respuesta['ok']
            this.saveUser(respuesta.userDB);
            this.saveToken (respuesta.token); // respuesta['token']
            this.usuario = respuesta.userDB;
            this.enviarUsuario();
            
            resolve (respuesta);
          } else {                            // intento fallido
            this.token = null;
            this.storage.clear();
            resolve (respuesta);
          }
        })
    })
  }
  
  getUsuario(): Promise<IUsario> {
    return new Promise<IUsario>( resolve => {
      this.storage.get('usuario')
        .then((user) => {
          resolve (user);
        });
    });
  }

  leerUsuario() {
      return this.storage.get('usuario');
  }

  // async es para que retorne una promesa
  async saveToken(token: string) {
    this.token = token;
    console.log(this.token);
    // await: Esperamos (bloqueo) hasta que token se haya almacenado en el storage y al app no siga
    await this.storage.set('token', token); // almacenamos el token
  }

  async saveUser(user: IUsario) {
    console.log (user);
    // await: Esperamos (bloqueo) hasta que token se haya almacenado en el storage y al app no siga
    await this.storage.set('usuario', user); // almacenamos el token
  }

  uploadImagen( img: string ){
    console.log(img );
    console.log('tk = ', this.token);
    const options: FileUploadOptions = {
      fileKey: 'image',
      headers: {
        'x-token': this.token,
      }
    }
    // creamos una tarea. En fileTransfer tengo info de la subida
    const fileTransfer: FileTransferObject = this.fileT.create();
    fileTransfer.upload( img, `${ URL }/uploads`, options )
      .then( data => {
        console.log( data )
      }).catch( err => {
        console.log(' error en carga ', err )
      });

  }

}