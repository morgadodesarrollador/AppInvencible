import { Component, OnInit } from '@angular/core';
import { TemporadasService } from '../../../services/temporadas.service';
import { ITemporadas } from '../../../interfaces/TemporadasInterface';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss'],
})
export class ListarComponent implements OnInit {

  temporadas: ITemporadas;
  constructor( private tS: TemporadasService ) {
    this.getTemporada(2020);

   }

  async getTemporada(year){
    const datos =  await this.tS.getTemporada(year);
    console.log(datos);
    this.temporadas = datos.temporadasDB;
    console.log(this.temporadas);
  }
  ngOnInit() {}

}
