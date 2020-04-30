//todas las rutas a usuarios: login, logout, new usuario ...

import { Router, Request, Response } from 'express';
import usuarioController from '../controllers/usuarioController';
import { verificaToken } from '../middlewares/authToken';

const usuariosRouter = Router();
const uController  = new usuarioController();
//req: request; res: response

console.log('usuarios');
// (ruta, [middleware1, middleware2, ], Callback)
usuariosRouter.post('/update', verificaToken, uController.update);
usuariosRouter.post('/view', verificaToken, uController.view);
usuariosRouter.post('/login', uController.login);
usuariosRouter.post('/new', uController.new);

// ruta para subir archivos, se verifica el token antes
usuariosRouter.post('/upload', verificaToken, uController.uploadAvatar );
usuariosRouter.get('/imagen/:userId/:img', uController.getImage);
usuariosRouter.post('/imagen/delete/:userId/:pos', verificaToken, uController.deleteImage);





export default usuariosRouter;