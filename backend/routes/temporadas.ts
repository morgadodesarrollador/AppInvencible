//todas las rutas a usuarios: login, logout, new usuario ...

import { Router, Request, Response } from 'express';
import temporadasController from '../controllers/temporadasController';
import { verificaToken } from '../middlewares/authToken';

const temporadasRouter = Router();
const temporadasCtrl  = new temporadasController();

temporadasRouter.post('/new', verificaToken, temporadasCtrl.new);
temporadasRouter.post('/edit', verificaToken, temporadasCtrl.edit);

temporadasRouter.post('/listar', verificaToken, temporadasCtrl.listar);


export default temporadasRouter;