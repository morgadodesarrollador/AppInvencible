import { Component, OnInit } from '@angular/core';
import { ILogin, MsnAPIUser } from '../../interfaces/UsuarioInterface';
import { UsuariosService } from '../../services/usuarios.service';
import { UiServiceService } from '../../services/ui-services.service';
import { NavController } from '@ionic/angular';

import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

 public usuario: ILogin = {
   email: 'morgado@gmail.com',
   password: '1234'
  };

  constructor( private uS: UsuariosService, private storage: Storage, 
               private uiS: UiServiceService, private navCtrl: NavController) { 
    console.log(this.usuario);
  }

  ngOnInit() {}

  async login() {
    console.log(this.usuario);
    // this.uS.login(this.usuario); --> regresa una promesa
    // await this.uS.login(this.usuario); regresa el resultado de la promesa (true/false)
    const respuesta = await this.uS.login(this.usuario); // regresa una promesa

    if (respuesta.ok){
      // entramos a la aplicación al home
      console.log (respuesta.userDB);
      this.navCtrl.navigateRoot ('/home', { animated: true });

    } else {
      // mostrar alerta de usuario
      this.uiS.alertaInformativa(respuesta.mensaje);

    }
  }
}