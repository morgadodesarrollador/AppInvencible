import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IUsario, MsnAPIUser } from '../../interfaces/UsuarioInterface';
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

  usuario: IUsario = {
    email: 'fadsf',
    nombre: 'asdf',
    avatar: 'adsf',
    password: 'dfsa'
  };

  constructor(private http: HttpClient, private  uS: UsuariosService,
              private uiS: UiServiceService, private navCtrl: NavController ) { }

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
}
