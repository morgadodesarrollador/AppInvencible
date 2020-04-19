
export interface ILogin {
    email: string;
    password: string;
}

export interface MsnAPIUser {
     ok: string;
     mensaje?: string;
     token?: string;
     userDB?: IUsario;
 }

export interface IUsario {
    _id?: number;
    email?: string;
    password?: string;
    avatar?: string;
    nombre?: string;
    foto?: any;
 }