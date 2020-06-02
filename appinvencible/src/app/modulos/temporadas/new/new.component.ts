import { Component, OnInit } from '@angular/core';
import { ITemporada, ITemporadas } from '../../../interfaces/TemporadasInterface';
import { TemporadasService } from '../../../services/temporadas.service';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';

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
  idTemp: any = null;
  temporadas: ITemporadas;
  constructor(private tS: TemporadasService, private paramRoute: ActivatedRoute, 
              private storage: Storage, private navCtrl: NavController) { }

  async editar(){
    console.log ("--------", this.temporada , this.temporadas.year);

    this.temporada.item = this.idTemp;
    this.temporada.year = this.temporadas.year; 
    await this.tS.new(this.temporada, this.temporadas.year);
    
  }

  next(){
    console.log('next');
    this.idTemp++;
    if (this.idTemp >= this.temporadas.temporada.length){
      this.idTemp = this.temporadas.temporada.length - 1;
    }
    this.rellenarTemporada();
  }

  previous(){
    console.log('previous')
    this.idTemp--;
    if (this.idTemp < 0 ){
      this.idTemp = 0;
    }
    this.rellenarTemporada();
  }

  async new() {
    console.log ( this.temporada , this.temporadas.year);
    this.temporada.item = null;
    this.navCtrl.navigateRoot ('/temporadas/(temporada:listar)', { animated: true });
    await this.tS.new(this.temporada);
    
  }
  async ngOnInit() {
    this.idTemp = this.paramRoute.snapshot.paramMap.get('id');
    if (this.idTemp != null ){
      this.rellenarTemporada();
    }
  }

  async rellenarTemporada (){
    this.temporadas = await this.tS.getTemporadasStorage('temporadas');
    console.log(this.idTemp, this.temporadas.temporada[this.idTemp]);
    this.temporada = this.temporadas.temporada[this.idTemp];
    let f  = this.temporada.fdesde.toString().split('T');
    this.temporada.fdesde = f[0];
    f  = this.temporada.fhasta.toString().split('T');
    this.temporada.fhasta = f[0];
    //date.toDateString("yyyy-MM-dd");;
  }
}
