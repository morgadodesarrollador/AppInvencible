//todas las rutas a usuarios: login, logout, new usuario ...

import { Router, Request, Response } from 'express';
import usuarioController from '../controllers/usuarioController';
import { verificaToken } from '../middlewares/authToken';

const usuariosRouter = Router();
const uController  = new usuarioController();
//req: request; res: response

console.log('usuarios');
// ruta para subir archivos, se verifica el token antes
usuariosRouter.post('/upload', verificaToken, uController.uploadAvatar );

//usuariosRouter.post('/upload', verificaToken, uController.uploadAvatar );

// (ruta, [middleware1, middleware2, ], Callback)
usuariosRouter.post('/update', verificaToken, uController.update);

usuariosRouter.post('/login', uController.login);

usuariosRouter.post('/new', uController.new);


export default usuariosRouter;