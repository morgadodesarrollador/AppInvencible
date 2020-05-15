import { Schema, model, Document } from 'mongoose';

const temporada = new Schema({
    nombre: { type: String },
    precioBase: { type: Number },
    precioAdic: { type: Number },
    precioSemana: { type: Number },
    precioFSemana: { type: Number },
    fdesde: { type: String },
    fhasta: { type: String },
})

const temporadasSchema  = new Schema({
    year: { type: Number },
    temporada: [{ type: temporada }]
});

export  interface ITemporada{
    nombre?: String;
    precioBase?: number;
    precioAdic?: number;
    precioFSemana?: number;
    precioSemana?: number;
    fdesde?: Date;
    fhasta?: Date;
}

export  interface ITemporadaYear extends Document{
    year?: Number;
    temporada: [ITemporada];
}


export const TemporadasModel = model<ITemporadaYear>('Temporadas', temporadasSchema);