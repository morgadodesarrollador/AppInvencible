import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-temporadas',
  templateUrl: './temporadas.component.html',
  styleUrls: ['./temporadas.component.scss'],
})
export class TemporadasComponent implements OnInit {

  constructor( private navCtrl: NavController ) { }

  newTemporada(){
    this.navCtrl.navigateRoot ('/temporadas/(temporada:new)', { animated: true });
  }

  listarTemporadas(){
    this.navCtrl.navigateRoot ('/temporadas/(temporada:listar)', { animated: true });
  }
  ngOnInit() {}

}
