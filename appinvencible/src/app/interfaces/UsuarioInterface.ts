
export interface ILogin {
    email: string;
    password: string;
}

export interface IRegitro {
    email: string;
    password: string;
    avatar: string;
    nombre: string;
 }

export interface MsnAPIUser {
     ok: string;
     mensaje?: string;
     token?: string;
 }

export interface IUsario {
    _id: number;
    email: string;
    password: string;
    avatar: string;
    nombre: string;
 }