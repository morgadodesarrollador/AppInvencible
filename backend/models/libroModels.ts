import { Schema, model, Document } from 'mongoose';
import { IAutor } from './autorModels';
const libroSchema = new Schema({
    titulo: { type: String, required: [ true, 'Nombre es requerido'] },
    paginas: { type: Number },
    isbn: { type: String },
    autor: [{ type: Schema.Types.ObjectId, ref: "Autor" }],
});
;

export interface ILibro  extends Document {
    titulo: string;
    paginas?: number;
    isbn: string;
    autor: any ;
}

export const LibroModel = model<ILibro>('Libro', libroSchema);