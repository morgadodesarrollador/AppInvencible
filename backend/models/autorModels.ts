import { Schema, model, Document } from 'mongoose';
import { Tracing } from 'trace_events';

const autorSchema = new Schema({
    nombre: { type: String, required: [ true, 'Nombre es requerido'] },
    biografia: { type: String },
    nacionalidad: { type: String },
    fecha: { type: Date },
});
;

export interface IAutor  extends Document {
    _id: string;
    nombre: string;
    biografia?: string;
    nacionalidad: string;
    fecha: Date;
}

export const AutorModel = model<IAutor>('Autor', autorSchema);