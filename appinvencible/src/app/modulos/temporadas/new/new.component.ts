import { Component, OnInit } from '@angular/core';
import { ITemporada } from '../../../interfaces/TemporadasInterface';
import { TemporadasService } from '../../../services/temporadas.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {
  
  temporada: ITemporada = {
    year: 0,
    nombre: 'Temporada  Alta',
    precioBase: 0,
    precioAdic: 20,
    precioFSemana: 0,
    precioSemana: 0,
    fdesde: null,
    fhasta: null
  };
  idTemp: number = null;
  constructor(private tS: TemporadasService, private paramRoute: ActivatedRoute) { }

  editar(){
    console.log('edit')
  }

  next(){
    console.log('next')
  }

  previous(){
    console.log('previous')
  }

  async new() {
    console.log ( this.temporada );
    await this.tS.new(this.temporada);
  }
  ngOnInit() {
    this.idTemp = this.paramRoute.snapshot.paramMap.get('id');
    console.log(this.idTemp);
  }

}
