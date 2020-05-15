//todas las rutas a usuarios: login, logout, new usuario ...

import { Router, Request, Response } from 'express';
import reservasController from '../controllers/reservasController';
import { verificaToken } from '../middlewares/authToken';

const reservasRouter = Router();
const reservasCtrl  = new reservasController();

reservasRouter.post('/new', verificaToken, reservasCtrl.new);
reservasRouter.post('/filtrar', verificaToken, reservasCtrl.filtrar);


export default reservasRouter;