import { Component, OnInit } from '@angular/core';
import { IReserva } from '../../../interfaces/ReservasInterface';
import { ReservasService } from '../../../services/reservas.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {
  finicio: Date;
  ffin: Date;
  public reserva: IReserva  = {
    _id: '',
    cliente: 'juan',
    agencia: 'booking',
    ciudad: '',
    temporada: {
      finicio: null,
      ffin: null,
      duracion: 0,
      mes: 0,
      anio: 0,
      npersonas: 0,
      precioTotal: 0, precioReal: 0, comision: 0,
      temporadas: 0
    }
  }

  constructor(private reservaS: ReservasService) {
    console.log(this.reserva)
   }
  
  getDias(){
    this.finicio = new Date(this.reserva.temporada.finicio as Date);
    this.ffin = new Date(this.reserva.temporada.ffin as Date );
    const diasdif = this.ffin.getTime() - this.finicio.getTime();
    this.reserva.temporada.duracion = Math.round(diasdif/(1000*60*60*24));
    this.reserva.temporada.mes = this.finicio.getMonth() + 1;
    this.reserva.temporada.anio = this.finicio.getFullYear();
  }
  new(){
    
    console.log(this.reserva);
    this.reservaS.new(this.reserva);

  }
  ngOnInit() {}

  getPReal(){
    this.reserva.temporada.precioReal = 
        this.reserva.temporada.precioTotal as number - this.reserva.temporada.comision as number;
    
  }

}
