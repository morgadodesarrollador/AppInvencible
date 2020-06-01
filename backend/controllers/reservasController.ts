import { Router, Request, Response } from 'express';
import { ReservasModel, IReserva, INumero  } from '../models/reservasModels';

import * as dot from 'ts-dot-prop';

//interfaz para formar la Query tipo Dot Notation en el Find()
interface IFiltro {
  [index: string]: any;
}

class reservasController {

  constructor() {  }

  public filtrar(req: any, res:Response){
      
    let params:any  = req.body.parametros; //vienen las condiciones en un array json
    console.log(params);
    let filtro = {} as IFiltro;
    let valor:string  = '';
    let ruta: string;
    Object.keys(params).forEach( item => {
      ruta = `${item}`;
      console.log ('--> ',ruta  );
     // dot.paths(ruta).forEach( key => { // recorre cada objeto
      if (typeof params[item] != 'object'){
        valor  = dot.get(params, ruta);
        filtro[ruta] = valor;
      }else{
        Object.keys(params[item]).forEach( key => { 
          ruta = `${item}.${key}`;
          valor  = dot.get(params, ruta);
          if (Object.keys(valor) == [])
            filtro[ruta] = valor;
          else
            if (Object.keys(valor).indexOf('operador') == 0){
              const ruta_op = `${item}.${key}.operador`;
              const ruta_val = `${item}.${key}.valor`;
              const operador = dot.get(params, ruta_op);
              const valor = dot.get(params, ruta_val);
              if (operador  == '>'){
                filtro[ruta] = {$gte: valor};
              }else if (operador == '='){
                filtro[ruta] = {$eq: valor};
              }else if (operador == '<'){
                filtro[ruta] = {$lte: valor};
              }
              
            }
        });
      }
    })
    console.log("-->",filtro);
   // ReservasModel.find({'agencia': 'booking',"temporada.duracion": {'$gte':'6'}})
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

public async  new(req: any, res: Response) {
    console.log('nueva reserva ...', req.body);
    const reserva = new ReservasModel();
    reserva.cliente = req.body.cliente;
    reserva.agencia = req.body.agencia;
    reserva.ciudad = req.body.ciudad;
    reserva.temporada = req.body.temporada;
  
    let c = await reserva.getTemporadas();
    reserva.temporadas = c;   
    console.log ('c = ', c);
    ReservasModel.create(reserva)
      .then( reserevaDB => {
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