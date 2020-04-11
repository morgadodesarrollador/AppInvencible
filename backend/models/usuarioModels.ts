import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

const usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [ true, 'Nombre es requerido']
    },
    avatar: {
        type: String,
        default:'logo.png'
    },
    email: {
        type: String,
        unique: true,
        required: [ true, 'email es requerido']
    },
    password: {
        type: String,
        required: [ true, 'password es requerido']
    }
    
});

//creamos un método para comparar la contraseña. 
//Recibiremos el password de la request y lo compararemos con el de la BD
usuarioSchema.method('compararPassword', function( password: string = ''): boolean {
    if (bcrypt.compareSync( password, this.password )){
        return true
    }else {
        return false;
    }
});

interface IUsuario  extends Document {
    nombre: string;
    avatar: string;
    email: string;
    password: string;
    compararPassword(password:string):boolean;
}

export const UsuarioModel = model<IUsuario>('Usuario', usuarioSchema);