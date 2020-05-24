import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ReservasService } from '../../../services/reservas.service';
import { MsnAPIReserva, IReserva } from '../../../interfaces/ReservasInterface';

// tslint:disable-next-line: label-position
// tslint:disable-next-line: no-unused-expression
// @ViewChild ('calendar', {static: false}) calendar: ElementRef;

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss'],
})
export class ListarComponent implements OnInit {
  reservas: IReserva[];
  operador: string;
  
  public params: IReserva  = {
    
    temporada: {
      anio:     { operador: '>', valor: 0 },
      duracion: { operador: '>', valor: 0 },
      finicio:  { operador: '>', valor: 0 },
      ffin:     { operador: '', valor: 0 },
      npersonas: { operador: '>', valor: 0 }
    }
  }

  constructor(private rS: ReservasService) {
    console.log('listados');
    this.filtrar();
  }
  cambiar(anio){
    console.log (anio);
  }
  public selOperador ($event){
    this.operador = $event;
    console.log(this.operador);
  }

  public async filtrar(){
    console.log ('filtrar');
    console.log(this.params);
    const  resultado = await this.rS.filtrar(this.params);
    if (resultado.ok){
      this.reservas = resultado.reservasDB;
      //  this.reservas.reservasDB  = resultado.reservasDB;
      //  console.log(resultado.reservasDB);
    }
  

  }

  ngOnInit() {}

}
