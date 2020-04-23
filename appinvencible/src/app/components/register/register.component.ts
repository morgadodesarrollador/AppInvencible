import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IUsario, MsnAPIUser } from '../../interfaces/UsuarioInterface';
import { ImagenInterface } from '../../interfaces/imagenInterface';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { UsuariosService } from '../../services/usuarios.service';
import { UiServiceService } from '../../services/ui-services.service';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  foto: any;
  respuesta: ImagenInterface = {
    login: '',
    base64: '',
    status: ''
  };
  usuario: IUsario = {
    email: '',
    nombre: '',
    avatar: '',
    password: ''
  };

  constructor(private camera: Camera, private http: HttpClient, private  uS: UsuariosService,
              private uiS: UiServiceService, private navCtrl: NavController,
              // tslint:disable-next-line: deprecation
              ) { }

  ngOnInit() {}

  async register(fRegister: NgForm){

    if (fRegister.invalid) { return; };

    console.log(fRegister.valid);
    const respuesta = await this.uS.register(this.usuario);
    console.log (respuesta);
    if (respuesta.ok){
      this.navCtrl.navigateRoot ('/login', { animated: true });

    } else {
      // mostrar alerta de usuario
      this.uiS.alertaInformativa(respuesta.mensaje);
    }

  }
  galeria(){
    this.camera.Direction = {BACK: 0, FRONT: 1};
    const options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true, // permite modificar la imagen 
      correctOrientation: true,
      targetHeight: 400, // tamaño de la imagen
      targetWidth: 400,
      cameraDirection: 1 // dirección de la cámara, (en android no funciona)
    }
    this.procesarImagen(options);
  }
  hacerFoto() {
    this.camera.Direction = {BACK: 0, FRONT: 1};
    const options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      allowEdit: true, // permite modificar la imagen 
      correctOrientation: true,
      targetHeight: 400, // tamaño de la imagen
      targetWidth: 400,
      cameraDirection: 1 // dirección de la cámara, (en android no funciona)
    }
    this.procesarImagen(options);
  }

  procesarImagen(options: CameraOptions) {
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      //let base64Image = 'data:image/jpeg;base64,' + imageData;
 
      // const img = window.Ionic.WebView.convertFileSrc( imageData );
      // console.log (img);
      // this.tempImages.push( img );
       this.usuario.foto = 'data:image/jpeg;base64,' + imageData;
 // imageData es el string base64 de la imagen
       this.respuesta.base64 = imageData;
       this.uS.uploadImagen ( imageData );
     }, (err) => {
      // Handle error
     });
  }

  

}
