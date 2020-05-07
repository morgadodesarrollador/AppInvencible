import * as express from 'express';
import { Router, Request, Response } from 'express';
import { AutorModel, IAutor } from '../models/autorModels';
import { LibroModel, ILibro } from '../models/libroModels';


class libreriaController {

  constructor() {  }
  
  public getLibros(req: any,res:Response) {
    LibroModel.find({}, (err, librosDB) => {
      AutorModel.populate(librosDB, { path: 'autor'}, (err, librosDB) => {
        res.json({
          ok: true,
          libros: librosDB
      })
      })
    })
  }

  public getLibro(req: any,res:Response) {
    const u = new LibroModel();
    u.isbn = req.body.isbn;
    LibroModel.findOne({isbn: u.isbn}, (err, libroDB) => {
      console.log(libroDB);
      AutorModel.populate(libroDB, { path: 'autor'}, (err, libroDB) => {
        res.json({
          ok: true,
          libro: libroDB
      })
      })
    })
  }
  public newLibro(req: any,res:Response) {
    // cogemos las imagenes de ese usuario q se subieron previamente y la almacenamos en mongo
    console.log(req.body);
    
    const libro = new LibroModel();
    libro.titulo= req.body.titulo;
    libro.paginas = req.body.paginas;
    libro.isbn = req.body.isbn;
    libro.autor = req.body.autor;
    /*
    AutorModel.findOne({nombre: 'morgado'}, (err, autorDB)=> {
      if ( err ) throw err;
      u.autor = autorDB;
    })
    */
   //req.body.autor.forEach(function (value: any) {
   //  libro.autor.push(value);
   // });
    LibroModel.create(libro)
    .then( libroDB => { 
      console.log("--->", libroDB.autor.nacionalidad);
      res.json({
          ok: true,
          autor: libroDB
      })
    }).catch( err => { 
      res.json({ 
          ok: false,
          mensaje: 'email existe ...'
      })
    })
  
  }
  public newAutor(req: any,res:Response) {
    // cogemos las imagenes de ese usuario q se subieron previamente y la almacenamos en mongo
    console.log(req.body);
    
    const u = new AutorModel();
    u.nombre= req.body.nombre;
    u.biografia = req.body.biografia;
    u.nacionalidad = req.body.nacionalidad;
    u.fecha= req.body.fecha;
      
    AutorModel.create(u)
    .then( authorDB => { 
      res.json({
          ok: true,
          autor: authorDB
      })
    }).catch( err => { 
      res.json({ 
          ok: false,
          mensaje: 'email existe ...'
      })
    })
  
  }
 
   
}
 
export default libreriaController;