import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-operadores',
  templateUrl: './operadores.component.html',
  styleUrls: ['./operadores.component.scss'],
})

export class OperadoresComponent implements OnInit {
  // tslint:disable-next-line: no-output-rename
  @Output('operador') operador: EventEmitter<string> = new EventEmitter();
  op: string;

  constructor() { }
  cambiar(){
    console.log(this.operador);
    console.log(this.operador);
    this.operador.emit(this.op)
  }
  ngOnInit() {}

}
