import { Component, OnInit } from '@angular/core';
import { ReservasService } from '../services/reservas.service';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.scss'],
})
export class ReservasComponent implements OnInit {

  constructor(private _rs: ReservasService) { }

  ngOnInit() {
    console.log('componente');
    this._rs.getReservas().subscribe(
      respuesta => {
        console.log('pepe'),
        console.log(respuesta);
      })
  }

}
