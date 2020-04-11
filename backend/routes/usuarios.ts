//todas las rutas a usuarios: login, logout, new usuario ...

import { Router, Request, Response } from 'express';
import { UsuarioModel } from '../models/usuarioModels';
import usuarioController from '../controllers/usuarioController';
import { verificaToken } from '../middlewares/authToken';

const usuariosRouter = Router();
const uController  = new usuarioController();
//req: request; res: response


// (ruta, [middleware1, middleware2, ], Callback)
usuariosRouter.post('/update', verificaToken, uController.update);

usuariosRouter.post('/login', uController.login);

usuariosRouter.post('/new', uController.new);

export default usuariosRouter;