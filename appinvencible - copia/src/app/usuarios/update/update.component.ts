import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { UsuariosService } from '../../services/usuarios.service';

import { HttpClient } from '@angular/common/http';
import { NavController , IonSlides} from '@ionic/angular';
import { UiServiceService } from '../../services/ui-services.service';
import { ImagenInterface } from '../../interfaces/imagenInterface';
import { IUsario, MsnAPIUser } from '../../interfaces/UsuarioInterface';
import { ViewImagePipe } from '../../pipes/view-image.pipe';

declare var window: any;

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent implements AfterViewInit{

  @ViewChild('testSlider',  { static: true } ) slider: any;
  // tslint:disable-next-line: semicolon
//  slider;

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  foto: any;
  fotos: string[] = [];
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
  ngAfterViewInit() {}
  
  constructor(private camera: Camera, private http: HttpClient, private navCtrl: NavController,
              private  uS: UsuariosService, private UiS: UiServiceService ) {

     this.getDatos();
  }
  async delete(){
    const index = await this.slider.getActiveIndex()
    console.log(index);
    console.log( this.usuario.imgs[index]);
    const respuesta = await this.uS.deleteImage(index);
    if (respuesta.ok){
      this.UiS.alertaInformativa(respuesta.mensaje);
    }
  }
  logo() {
    this.slider.getActiveIndex().then(index => {
      console.log(index);
      console.log( this.usuario.imgs[index]);
      this.usuario.avatar = this.usuario.imgs[index];
    })
  }

  slideChanged(){
    console.log('fadfsad');
    this.slider.getActiveIndex().then(index => {
      console.log(index);
      this.update();
   });
  }
  async getDatos() {
    const respuesta: MsnAPIUser = await this.uS.getDatosUsuario();
    console.log (respuesta);
    if (respuesta.ok) {
      this.usuario = respuesta.userDB;
      console.log (this.usuario );
    }
  }
  galeria() {
    this.camera.Direction = {BACK: 0, FRONT: 1};
    const options: CameraOptions = {
      destinationType: this.camera.DestinationType.FILE_URI,
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
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA,
      allowEdit: true, // permite modificar la imagen 
      correctOrientation: true,
      targetHeight: 400, // tamaño de la imagen
      targetWidth: 400,
      cameraDirection: 1 // dirección de la cámara, (en android no funciona)
    }
    this.procesarImagen(options);
  }

  procesarImagen(options: CameraOptions) {
    this.foto = null;
    this.camera.getPicture(options)
      .then((imageData) => {
        const img = window.Ionic.WebView.convertFileSrc( imageData );
        this.foto =  img;
        console.log (this.foto);
        this.uS.uploadImagen ( imageData );
      }, (err) => {
        console.log (err);
    });
  }

  async update() {
    const datos = await this.uS.update(this.usuario);
    console.log (datos);
    this.usuario  = datos.userDB;
    console.log (this.usuario.imgs);
  }

}
