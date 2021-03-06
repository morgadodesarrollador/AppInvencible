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
    
    console.log('EDITTTTTTT', req.body.idyear, req.body.temporada);
    
    const year = req.body.idyear;
    const idTemp =  req.body.temporada.item;
    const temporada: ITemporada = {
      _id: req.body.temporada._id,
      item: req.body.temporada.item,
      nombre: req.body.temporada.nombre,
      fdesde: req.body.temporada.fdesde,
      fhasta: req.body.temporada.fhasta,
      precioBase: req.body.temporada.precioBase,
      precioAdic: req.body.temporada.precioAdic,
      precioSemana: req.body.temporada.precioSemana,
      precioFSemana: req.body.temporada.precioFSemana,
    } 
   // TemporadasModel.find({},{ temporada:{$slice:[idTemp,1]} }, { new: true })

    console.log(temporada);
  //  const temporadaUpt: any = TemporadaYear.addTemporada(idTemp, temporada);
    TemporadasModel.findOne({"year":year})
      .then(temporadasDB => {
          const temporadaUpt: any = temporadasDB.addTemporada(idTemp, temporada);
          console.log ("ok",idTemp, temporadaUpt);
          temporadasDB.temporada[idTemp] = temporadaUpt;
          TemporadasModel.updateOne({"year":year ,"temporada._id": temporada._id}, 
                              {$set:{"temporada.$": temporadaUpt}}, {new: true})
          .then(data => {
            console.log ("ok", data);
          })
          .catch (err => {
            console.log (err)
          })                   
         
         /*                     temporadasDB.save(function(err) {
            if (err) return console.log(err);
          }); */
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