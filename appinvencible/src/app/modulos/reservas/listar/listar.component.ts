import { Component, OnInit } from '@angular/core';
import { ReservasService } from '../../../services/reservas.service';
import { MsnAPIReserva, IReserva } from '../../../interfaces/ReservasInterface';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss'],
})
export class ListarComponent implements OnInit {
  reservas: IReserva[];
  operador: string;
  public params: IReserva  = {
    agencia: '',
    temporada: {
      anio:  {
        operador: '',
        valor: 0
      },
      duracion: {
        operador:  '',
        valor: 0
      },
    }
  }

  constructor(private rS: ReservasService) {
    console.log('listados');
    this.filtrar();
  }
  public selOperador ($event){
    this.operador = $event;
    console.log(this.operador);
  }

  public async filtrar(){
    this.params.temporada.anio.operador =  '=';
    this.params.temporada.mes = 7;
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
