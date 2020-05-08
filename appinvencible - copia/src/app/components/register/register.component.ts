import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IUsario, MsnAPIUser } from '../../interfaces/UsuarioInterface';
import { ImagenInterface } from '../../interfaces/imagenInterface';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { UsuariosService } from '../../services/usuarios.service';
import { UiServiceService } from '../../services/ui-services.service';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { ViewImagePipe } from '../../pipes/view-image.pipe';

declare var window: any;

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

    const respuesta =  await this.uS.register(this.usuario);
    if (respuesta.ok){
      
      this.navCtrl.navigateRoot ('/login', { animated: true });

    } else {
      // mostrar alerta de usuario
      
      this.uiS.alertaInformativa(respuesta.mensaje);
    }

  }
  

}
