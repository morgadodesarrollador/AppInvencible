import { Schema, model, Document } from 'mongoose';

const temporadaSchema  = new Schema({
    finicio: { type: Date },
    ffin: { type: Date },
    duracion: { type: Number },
    anio: { type: Number },
    mes: { type: Number },
    npersonas: { type: Number },
    precioTotal: { type: Number }, 
    comision: { type: Number },
    precioReal: { type: Number }
});

const reservaSchema = new Schema({
    cliente: { type: String },
    agencia: { type: String },
    ciudad: { type: String },
    estado: { type: String },
    fReserva: { type:  Date },
    temporada: { type: temporadaSchema }
});

// Establecemos un campo virtual
reservaSchema.virtual('finicio')
  .set(function(fecha: string) {
    // El formato esperado es 'yyyy-mm-dd' que es el devuelto por el campo input
    // el valor recibido se almacenará en el campo fecha_nacimiento_iso de nuestro documento
    this.temporada.finicio = new Date(fecha);
  })
  .get(function(){
    // el valor devuelto será un string en formato 'yyyy-mm-dd'
    return this.finicio.toISOString().substring(0,10);
  });

export interface INumero {
    valor: number | Date;
    operador: string;
}

export  interface ITemporada {
    finicio?: Date | INumero;
    ffin?: Date | INumero;
    duracion?: number;
    mes?: number;
    anio?: number | INumero;
    npersonas: number | INumero;
    precioTotal?: number | INumero;
    comision?: number | INumero;
    precioReal?: number | INumero;

}

export interface IReserva  extends Document {
    cliente?: string;
    agencia?: string;
    ciudad?: string;
    temporada: ITemporada;
}

export const ReservasModel = model<IReserva>('Reservas', reservaSchema);