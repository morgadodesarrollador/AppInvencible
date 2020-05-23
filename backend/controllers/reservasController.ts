import { Router, Request, Response } from 'express';
import { ReservasModel, IReserva, INumero  } from '../models/reservasModels';
import temporadasController from './temporadasController';
import * as dot from 'ts-dot-prop';

//interfaz para formar la Query tipo Dot Notation en el Find()
interface IFiltro {
  [index: string]: any;
}

class reservasController {

  constructor() {  }

  public filtrar(req: any, res:Response){
      
    let params:IReserva  = req.body.parametros; //vienen las condiciones en un array json
    console.log(params);
    let filtro = {} as IFiltro;
    let valor:string  = '';
    let ruta: Object = {};
    Object.keys(params).forEach( item => {
      ruta = `${item}` as Object;
      console.log ('--> ',ruta  );
     // dot.paths(ruta).forEach( key => { // recorre cada objeto
      if (typeof params[item] != 'object'){
        valor  = dot.get(params, ruta);
      //  console.log ('--> valor ', ruta, valor);
        filtro[ruta] = valor;
      }else{
        Object.keys(params[item]).forEach( key => { 
          ruta = `${item}.${key}`as Object;
          valor  = dot.get(params, ruta);
        //  console.log ('-->  hijo :', ruta, valor);
        //  console.log (Object.keys(valor));
          if (Object.keys(valor) == [])
            filtro[ruta] = valor;
          else
            if (Object.keys(valor).indexOf('operador') == 0){
              const ruta_op = `${item}.${key}.operador`as Object;
              const ruta_val = `${item}.${key}.valor`as Object;
             // console.log(ruta_op, ruta_val);
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