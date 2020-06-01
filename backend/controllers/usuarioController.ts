import * as express from 'express';
import { Router, Request, Response } from 'express';
import { UsuarioModel, IUsuario } from '../models/usuarioModels';
import bcrypt from 'bcrypt';
import Token from '../clases/token';
import { IFileUpload } from '../interfaces/file-upload';
import CFileSystem from '../clases/file-system';

const filesystem = new CFileSystem();

class usuarioController {

  constructor() {  }

  
  public view(req: any, res: Response){
    UsuarioModel.findOne({ _id: req.usuario._id}, (err, userDB) => {
      if (  err ) throw err;
      if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'email no existe'
            })
      }else{
        console.log (userDB);
            res.json({
                ok: true,
                userDB: userDB
            })
      }
    })
  }
                //req: Request
  public update(req: any, res:Response) {

    const imagenes = filesystem.moverImagenesTempaUsers ( req.usuario._id);
    const imagenesUsers = filesystem.GetImagenesDir( req.usuario._id , 'users');

    req.body.imgs = imagenesUsers;
    console.log(req.usuario._id, imagenesUsers);
    //si llegamos aquí es pq se ha validado el middleware 'validarToken'
    //actualizamos con los datos que vienen de la request
    const user = {
      nombre: req.body.nombre || req.body.nombre,
      email: req.body.email || req.body.email,
      avatar: req.body.avatar || req.body.avatar,
      imgs: imagenesUsers
    }
    console.log (user);
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
        avatar: userDB.avatar,
      });
      res.json({
          ok: true,
          token: tokenUser,
          userDB: userDB
      });
    })
  }
                      //Request
  public new(req: any,res:Response) {
    // cogemos las imagenes de ese usuario q se subieron previamente y la almacenamos en mongo
    console.log(req.body);
    //recibir info de la req --> necesito pasar el server por un middleware. 
    //Un Midleware es una función que se ejecuta antesque otra
    const u = new UsuarioModel();
    u.nombre = req.body.nombre;
    u.email = req.body.email;
    u.password = bcrypt.hashSync(req.body.password,10);
    u.avatar =  req.body.avatar;
    const user = {
      nombre: req.body.nombre,
      email: req.body.email,
      avatar: req.body.avatar,
      password: bcrypt.hashSync(req.body.password,10)
    }
    
    //UsuarioModel es un modelo de mongoose, para hacer busquedas,querys ...
    UsuarioModel.create(u)
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
    }).catch( err => { // hemos de distinguir casos, campos requeridos, clave unica(email ...)
            res.json({ // devolver los diferentes  casos de error en la inserccion
                ok: false,
                mensaje: 'email existe ...'
            })
    })
  
  }
 
  public login(req: Request,res:Response) {
    const body = req.body;
    console.log(body);
    UsuarioModel.findOne ({ email: body.email }, (err, userDB ) => {
        //1-. caso de error de BD lo muestra y salimos
        if ( err ) throw err; 
        //2-. el email no existe en  la BD
        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'email no existe'
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
            console.log (userDB);
            res.json({
                ok: true,
                token: tokenUser, 
                userDB: userDB
            })
        }else { //contraseña no es válida
            return res.json({
                ok: false,
                mensaje: 'La contraseña no válidos'
            })
        }
    })
  };

  public async uploadAvatar(req: any, res:Response){
     
    if (!req.files){ // no existen ficheros en la request
      return res.status(400).json({
        ok: false,
        mensaje:  'No sesubió ningún archivo'
      })
    }
    const file: IFileUpload = req.files.image;
    if (!file){ // no tiene el nombre imagen
      return res.status(400).json({
        ok: false,
        mensaje:  'No se subió ningún archivo - imagen'
      })
    }

    if ( !file.mimetype.includes('image')){ // si no es una imagen
      return res.status(400).json({
        ok: false,
        mensaje:  'No se subió ninguna imagen'
      });
    }
    // la imagen se encuentra en una memoria temporal del servidor
    //console.log(req);
    
    // saveImageTemp --> retorna  una  Promesa
    const nombre = await filesystem.saveImageTemp( file, req.usuario._id); // --> el método es async

    console.log ('id = ', req.usuario._id, nombre);
    res.json({
      ok: false,
      file: file.mimetype, 
      name: nombre
    });
    
   // this.update(req, res);
  }

  public getImage( req: Request, res:Response){
    const userId = req.params.userId;
    const img = req.params.img;
    
    const pathFoto = filesystem.getFotoUrl(userId, img);

    res.sendFile(pathFoto);
  }

  public async deleteImage(req: any, res:Response){
    const userId = req.params.userId;
    const pos = req.params.pos;
    console.log('imagen borrada', userId, pos);
    UsuarioModel.findOne({ _id: userId}, (err, userDB: IUsuario) => {
      if (err) throw err;
      if (userDB){
        console.log( userDB.imgs); 
        const img = userDB.imgs[pos];
        userDB.imgs.splice(pos, 1);
        userDB.save((err, userDB)=> {
          console.log(userDB);
          filesystem.deleteFile(userId, img )
            .then( resp => {
              console.log (resp);
              console.log (`borrada ${ img }`);
              return res.json({
                ok: true,
                mensaje: `${ img } del usuario ${userId} eliminada`
            })

            }).catch (err => {
              console.log (err)
            })

        })
      }
    });

    /*UsuarioModel.findOneAndDelete(
      { userId }
    )*/
  }

  
}
 
export default usuarioController;