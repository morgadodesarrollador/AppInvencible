import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UsuariosService } from './services/usuarios.service';
import { IUsario } from './interfaces/UsuarioInterface';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Reservas',
      url: '/reservas',
      icon: 'mail'
    },
    {
      title: 'Usuarios',
      url: '/usuarios',
      icon: 'paper-plane'
    },
    {
      title: 'Login',
      url: '/login',
      icon: 'heart'
    },
    {
      title: 'Archived',
      url: '/home',
      icon: 'archive'
    },
    {
      title: 'Trash',
      url: '/folder/Trash',
      icon: 'trash'
    },
    {
      title: 'Spam',
      url: '/folder/Spam',
      icon: 'warning'
    }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  usuario: IUsario;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private uS: UsuariosService
  ) {
    this.initializeApp();
    
  }

  // Forma2-. nos subscribimos a cualquier cambio que haga el servicio en el usuario  logeado/registrdo

  async getUsuario(){
    this.usuario = await this.uS.getUsuario();
  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.getUsuario();
    //Forma1-. nos subscribimos a cualquier cambio que haga el servicio en el usuario  logeado/registrdo
    this.uS.enviarUsuarioObservable.subscribe(respuesta => {
     this.usuario = respuesta; 
    });

    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}
