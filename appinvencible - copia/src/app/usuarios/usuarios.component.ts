import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {
  nombre = 'morgado';
  constructor(private _uS: UsuariosService) { }

  ngOnInit() {
    /*
    console.log('componente');
    this._uS.getUsuarios().subscribe(
      respuesta => {
        console.log(respuesta);
      });
    */
     }

}
