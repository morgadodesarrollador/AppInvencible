import jwt from 'jsonwebtoken';

export default class Token {
    private static  seed: string= 'el secreto demi éxito';
    private static caducidad: string = '30d';

    constructor() {}

    //devuelve el token en base a los datos del payload
    static  getJwtToken(payload: any): string  {//los datos que deeseo que cifre
        //firmamos el token
        return jwt.sign({ 
            usuario: payload

        }, this.seed, { expiresIn: this.caducidad })
    }

    static ckeckToken(userToken: string){
        return new Promise ( (resolve, reject) => {
            //cuerpo de la promesa
            jwt.verify(userToken, this.seed, (err, decoded)=> {
                //decoded tendrá la info (payload) decodificada que va en el token 
                if (err){  //con confiar en el token
                    reject(); //fuera se trabaja con el catch
                }else {
                    resolve (decoded);
                }
            })
        })
        
    }
}