import * as express from 'express';
import { Router, Request, Response } from 'express';
import { TemporadasModel, ITemporada, IDia } from '../models/temporadasModels';
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

  
  public edit(req: any, res:Response) {
    
    let idTemp:Number = req.body.item;
    console.log('EDITTTTTTT', idTemp);
    const temporadaYear = new TemporadasModel();
    temporadaYear.year = req.body.year;
    const temporada: ITemporada = {
      _id: req.body._id,
      item: req.body.item,
      nombre: req.body.nombre,
      fdesde: req.body.fdesde,
      fhasta: req.body.fhasta,
      precioBase: req.body.precioBase,
      precioAdic: req.body.precioAdic,
      precioSemana: req.body.precioSemana,
      precioFSemana: req.body.precioFSemana,
    } 
   // TemporadasModel.find({},{ temporada:{$slice:[idTemp,1]} }, { new: true })

    console.log(temporada);
    TemporadasModel.updateOne({"_id":'5ecfd96cd08f350444789b10',"temporada._id": temporada._id}, 
                              {$set:{"temporada.$": temporada}}, {new: true})
      .then(data => {
        console.log (data);
      })
      .catch (err => {
        console.log (err)
      })

  }

  public new(req: any, res:Response) {
    
    const temporada: any = {
      _id: req.body._id,
      item: req.body.item,
      nombre: req.body.nombre,
      fdesde: req.body.fdesde,
      fhasta: req.body.fhasta,
      precioBase: req.body.precioBase,
      precioAdic: req.body.precioAdic,
      precioSemana: req.body.precioSemana,
      precioFSemana: req.body.precioFSemana,
    } 
    console.log(temporada);
    TemporadasModel.findOne({year:req.body.year}, (err, temporadasDB) => {
        if ( err ) throw err; 
        if (temporadasDB) {        // se saca el año y se añade la temporada
          const idTemp = temporadasDB.temporada.length;
          console.log (idTemp);
          const temporadaNew: any = temporadasDB.addTemporada(idTemp, temporada);
          temporadasDB.temporada.push(temporadaNew); 
          temporadasDB.save(function(err) {
            if (err) return console.log(err);
          });
        }else{                     // se crea el año y se añade la temporada
          let temporadaYear = new TemporadasModel();
          const idia: IDia = {  disSt:'', temp:'0'}; //se ejecutará el método set de 'dias' --> 
          temporadaYear.year = req.body.year; // que crea el calendario de ese año con 365 dias
          temporadaYear.dias= [idia];
          temporada.ndiaInicial = temporadaYear.getNdia(req.body.year, temporada.fdesde);
          temporada.ndiaFinal = temporadaYear.getNdia(req.body.year, temporada.fhasta);
          temporadaYear.temporada.push(temporada);
          console.log("Crear Temporada-->2",req.body.year,temporadaYear);
          
          temporadaYear.save(function(err) {
            if (err) return console.error(err);
          });
        }
    })

    

    
  }
 
}
 
export default temporadasController;