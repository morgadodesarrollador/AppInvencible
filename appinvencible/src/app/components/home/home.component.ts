import { Component, OnInit } from '@angular/core';
import { IUsario } from '../../interfaces/UsuarioInterface';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  usuario: IUsario;
  constructor( private uS: UsuariosService ) { 
    
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

}
