import * as express from 'express';
import { Router, Request, Response } from 'express';
import { TemporadasModel, ITemporada } from '../models/temporadasModels';
import Token from '../clases/token';


class temporadasController {

  constructor() {  }

  public listar(req: any,res:Response) {
    TemporadasModel.findOne({year:req.body.year}, (err, temporadasDB) => {
        if ( err ) throw err; 
        if (temporadasDB){
          res.json({
            ok: true,
            mensaje: 'Listado de Temporadas de 2020 ', 
            temporadasDB: temporadasDB
          })
        }
    })
  };

  public new(req: any, res:Response) {
    const temporadaYear = new TemporadasModel();
    temporadaYear.year = req.body.year;
    const temporada: ITemporada = {
      nombre: req.body.nombre,
      fdesde: req.body.fdesde,
      fhasta: req.body.fhasta,
      precioBase: req.body.precioBase,
      precioAdic: req.body.precioAdic,
      precioSemana: req.body.precioSemana,
      precioFSemana: req.body.precioFSemana,
    } 

    

    TemporadasModel.findOne({year:req.body.year}, (err, temporadasDB) => {
        if ( err ) throw err; 
        if (temporadasDB) {
          const respuesta: any = temporadaYear.addTemporada(req.body.year, temporada);
          res.json (respuesta);
        }else{
          temporadaYear.temporada.push(temporada);
          TemporadasModel.create(temporadaYear)
            .then( temporadaDB => {
              res.json({
                ok: true,
                mensaje: 'Temporada insertada', 
                userDB: temporadaDB
              })
            }).catch( err => {
              res.json({
                ok: false,
                mensaje: 'temporada no insertada ...'
              })
            })
        }
    })

    

    
  }
 
}
 
export default temporadasController;