import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { ReservasService } from '../../services/reservas.service';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.scss'],
})
export class ReservasComponent implements OnInit {

  constructor(private _rs: ReservasService,  private navCtrl: NavController) { }

  newReserva(){
    this.navCtrl.navigateRoot ('/reservas/(second:new)', { animated: true });
  }

  listarReservas(){
    this.navCtrl.navigateRoot ('/reservas/(second:listar)', { animated: true });
  }
  ngOnInit() {
    console.log('componente');
  /*  this._rs.getReservas().subscribe(
      respuesta => {
        console.log('pepe'),
        console.log(respuesta);
      })
      */
  }

}
