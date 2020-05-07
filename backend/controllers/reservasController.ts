import * as express from 'express';
import { Router, Request, Response } from 'express';
import { ReservasModel, IReserva } from '../models/reservasModels';
import Token from '../clases/token';


class reservasController {

  constructor() {  }

  public new(req: any,res:Response) {
    console.log('nueva reserva ...', req.body);
    const reserva = new ReservasModel();
    reserva.cliente = req.body.cliente;
    reserva.agencia = req.body.agencia;
    reserva.temporada = req.body.temporada;
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