import { Component, OnInit } from '@angular/core';
import { IUsario } from '../../interfaces/UsuarioInterface';
import { UsuariosService } from '../../services/usuarios.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  usuario: IUsario;


  constructor( private uS: UsuariosService, private camera: Camera ) {
    
  }

  ngOnInit() {
    this.getUsuario();
    console.log(this.usuario); // undefined
  }

  async getUsuario(){
    this.usuario = await this.uS.getUsuario();
  }

  getUsuario1() {
    this.uS.leerUsuario()
      .then(user => {
        this.usuario = user;
      })
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
     //  this.respuesta.base64 = imageData;
       this.uS.uploadImagen ( imageData );
     }, (err) => {
      // Handle error
     });
  }


}
