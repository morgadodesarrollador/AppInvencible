import { Schema, model, Document } from 'mongoose';

const temporadaSchema  = new Schema({
    finicio: { type: Date },
    ffin: { type: Date },
    duracion: { type: Number },
    anio: { type: Number },
    mes: { type: Number },
});
const reservaSchema = new Schema({
    cliente: { type: String },
    agencia: { type: String },
    temporada: { type: temporadaSchema }
});

export  interface ITemporada {
    finicio?: Date;
    ffin?: Date;
    duracion?: number;
    mes?: number;
    anio?: number;
}

export interface IReserva  extends Document {
    cliente?: string;
    agencia?: string;
    temporada: ITemporada;
}

export const ReservasModel = model<IReserva>('Reservas', reservaSchema);