
import { Request, Response, NextFunction} from 'express';
import Token from '../clases/token';
                            //req: Request
export const verificaToken = (req: any, res: Response, next: NextFunction) => {
    //leemos la variable x-token del header y almacenamos en userToken
    const userToken = req.get('x-token') || '';
    //invocamos a checkToken
    Token.ckeckToken( userToken ) //promesa
        .then( (decoded: any) =>  { //si es cierto, obtenemos el payload (datos decodificados)
            console.log('Decoded', decoded);
            //creamos la propiedad 'usuario' en el Request que contiene los datos del payload
            req.usuario = decoded.usuario; //hacemos req: any
            //el token es cierto y ejecutamos la siguiente función alli donde se declare el token
            next();
        })
        .catch( err => {
            res.json({
                ok: false,
                mensaje:'Token no es correcto'
            })
        })
}