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
  public params: IReserva  = {
    agencia: '',
    temporada: {
    }
  }

  constructor(private rS: ReservasService) {
    console.log('listados');
    this.filtrar();
  }

  public async filtrar(){
    console.log ('filtrar');
    const  resultado = await this.rS.filtrar(this.params);
    if (resultado.ok){
      this.reservas = resultado.reservasDB;
      //  this.reservas.reservasDB  = resultado.reservasDB;
      //  console.log(resultado.reservasDB);
    }
  

  }

  ngOnInit() {}

}
