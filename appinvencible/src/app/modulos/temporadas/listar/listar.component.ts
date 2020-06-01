import { Component, OnInit } from '@angular/core';
import { TemporadasService } from '../../../services/temporadas.service';
import { ITemporadas } from '../../../interfaces/TemporadasInterface';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss'],
})
export class ListarComponent implements OnInit {
  anio: number;

  temporadas: ITemporadas = {
    year: 2020,
    temporada: null
  };
  
  constructor( private tS: TemporadasService, private navCtrl: NavController) {

   }

  async getTemporada(year){
    console.log(year);
    const datos =  await this.tS.getTemporada(year);
    console.log(datos);
    this.temporadas = datos.temporadasDB;
    
    // tslint:disable-next-line: forin
    for (let i = 0; i < this.temporadas.temporada.length; i++){
      this.temporadas.temporada[i].item = i;
      console.log(this.temporadas.temporada[i].item);
    }
    this.tS.saveTemporadasStorage(this.temporadas);
    console.log(this.temporadas);
  }

  updateTemp( item ){
    console.log(item);
    this.navCtrl.navigateRoot ('/temporadas/(temporada:update/' + item , { animated: true });
  }
  ngOnInit() {}


}
