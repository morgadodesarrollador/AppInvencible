import * as express from 'express';
import { Router, Request, Response } from 'express';
import { UsuarioModel } from '../models/usuarioModels';
import bcrypt from 'bcrypt';
import Token from '../clases/token';
class usuarioController {

  constructor() {  }
                //req: Request
  public update(req: any, res:Response) {
    //si llegamos aquí es pq se ha validado el middleware 'validarToken'
    //actualizamos con los datos que vienen de la request
    const user = {
      nombre: req.body.nombre || req.body.nombre,
      email: req.body.email || req.body.email,
      avatar: req.body.avatar || req.body.avatar
    }
    //actualizamos los datos del usuario
    UsuarioModel.findByIdAndUpdate( req.usuario._id, user, { new: true }, (err, userDB) => {
      if ( err ) throw err;
      if ( !userDB ){
        return res.json({
          ok: false,
          mensaje: 'No existe el usuario con ese  id'
        })
      }
      //llega la info del usuario para actualizarse. Hay que actualizar tb el token
      const tokenUser = Token.getJwtToken({ //payload
        _id: userDB._id,
        nombre: userDB.nombre,
        email: userDB.email,
        avatar: userDB.avatar
      });
      res.json({
          ok: true,
          token: tokenUser
      });
    })
    
  }
  public new(req: Request,res:Response) {
    
    //recibir info de la req --> necesito pasar el server por un middleware. 
    //Un Midleware es una función que se ejecuta antesque otra
    const user = {
      nombre: req.body.nombre,
      email: req.body.email,
      avatar: req.body.avatar,
      password: bcrypt.hashSync(req.body.password,10)
    }
    //UsuarioModel es un modelo de mongoose, para hacer busquedas,querys ...
    UsuarioModel.create(user)
        .then( userDB => { //userDB regresa de mongodb
          const tokenUser = Token.getJwtToken({ //payload
              _id: userDB._id,
              nombre: userDB.nombre,
              email: userDB.email,
              avatar: userDB.avatar
          });
          res.json({
              ok: true,
              token: tokenUser
          })
    }).catch( err => {
            res.json({
                ok: false,
                err
            })
    })
  
  }
 
  public login(req: Request,res:Response) {
    const body = req.body;
    UsuarioModel.findOne ({ email: body.email }, (err, userDB ) => {
        //1-. caso de error de BD lo muestra y salimos
        if ( err ) throw err; 
        //2-. el email no existe en  la BD
        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'Usuario/contraseña no válidos'
            })
        }
        //3-. el email existe en la BD --> hemos de comparar elpassword
        //userDB el un objeto del modelo de usuarios
        if (userDB.compararPassword( body.password )){
            // elusuario es válido. Devolveremos un ok y un token con jwt
            const tokenUser = Token.getJwtToken({ //payload
              _id: userDB._id,
              nombre: userDB.nombre,
              email: userDB.email,
              avatar: userDB.avatar
            });
            res.json({
                ok: true,
                token: tokenUser
            })
        }else { //contraseña no es válida
            return res.json({
                ok: false,
                mensaje: 'Usuario/contraseña no válidos'
            })
        }
    })
  };

  public intializeRoutes() {
   // this.router.get(this.path, this.getAllPosts);
   // this.router.post(this.path, this.createAPost);
  }
 
  getAllPosts = (request: express.Request, response: express.Response) => {
  //  response.send(this.posts);
  }
 
  createAPost = (request: express.Request, response: express.Response) => {
    const post: Post = request.body;
 //   this.posts.push(post);
    response.send(post);
  }
}
 
export default usuarioController;