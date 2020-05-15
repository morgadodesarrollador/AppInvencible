import * as express from 'express';
import { Router, Request, Response } from 'express';
import { ReservasModel, IReserva } from '../models/reservasModels';
import temporadasController from './temporadasController';
import * as dot from 'ts-dot-prop';

//interfaz para formar la Query tipo Dot Notation en el Find()
interface IFiltro {
  [index: string]: string;
}
const obj = {
    foo: 'bar',
    state: {
        name: 'New York'
    },
    fruit: [{
        type: 'Apple',
        color: 'red'
    }, {
        type: 'Mango',
        color: 'orange'
    }]
};

class reservasController {
  
 

  constructor() {  }

  public filtrar(req: any, res:Response){
   
    let params  = req.body.parametros; //vienen las condiciones en un array json
    let filtro = {} as IFiltro;
    let valor:string  = '';
    dot.paths(params).forEach(key=>{ // recorre cada objeto
      valor  = dot.get(params, key);
      console.log (key, valor);
      if (valor !='') {
        filtro[key] = valor;
      }
      
      
    });
    console.log(filtro);
 //   ReservasModel.find({"agencia": params.agencia, "temporada.anio": params.temporada.anio})
    ReservasModel.find(filtro)
      .then(reservasDB => {
        res.json({
          ok: true,
          reservasDB: reservasDB
        })
      }).catch(err => {
        console.log('okerr');

          res.json({
            ok: false,
            mensaje: 'noreervas'
          })
      })
  }
  public new(req: any,res:Response) {
    console.log('nueva reserva ...', req.body);
    const reserva = new ReservasModel();
    reserva.cliente = req.body.cliente;
    reserva.agencia = req.body.agencia;
    reserva.temporada = req.body.temporada;
    ReservasModel.create(reserva)
      .then( reserevaDB => {
        console.log(reserevaDB.temporada.finicio);
        res.json({
          ok: true,
          mensaje: 'reserva insertada', 
          userDB: reserevaDB
      })
    }).catch( err => {
        res.json({
          ok: false,
          mensaje: 'reserva no insertada ...'
        })
    })
  }
 
}
 
export default reservasController;