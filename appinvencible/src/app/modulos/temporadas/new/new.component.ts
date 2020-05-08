import { Component, OnInit } from '@angular/core';
import { ITemporada } from '../../../interfaces/TemporadasInterface';
import { TemporadasService } from '../../../services/temporadas.service';


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {

  temporada: ITemporada = {
    nombre: 'Temporada  Alta',
    year: 0,
    precioBase: 0,
    precioAdic: 20,
    precioFSemana: 0,
    precioSemana: 0,
    fdesde: null,
    fhasta: null
  };

  constructor(private tS: TemporadasService) { }

  async new() {
    console.log ( this.temporada );
    await this.tS.new(this.temporada);
  }
  ngOnInit() {}

}
