import { Schema, model, Document } from 'mongoose';
import { TemporadasModel } from './temporadasModels';


const temporadaSchema  = new Schema({
    finicio: { type: Date },
    ffin: { type: Date },
    duracion: { type: Number },
    anio: { type: Number },
    mes: { type: Number },
    npersonas: { type: Number },
    precioTotal: {  type: Number,  set: getPrecio }, 
    comision: { type: Number, set: getPrecio  },
    precioReal: {  type: Number , set: getPrecio },

});

function getPrecio(precio: any){
  return parseFloat(precio).toFixed(2)
}

function getDato(){
  const c =  getTotalTemp();
  console.log('dato=',c);
  return  getTotalTemp()
}

const reservaSchema = new Schema(
  {
    cliente: { type: String },
    agencia: { type: String },
    ciudad: { type: String },
    estado: { type: String },
    fReserva: { type:  Date },
    temporadas: { type: Number, },
    temporada: { type: temporadaSchema },
    dato: {  
        type: Number , 
        set: async function(){
          const total = getTotalTemp();
          return (total);
        } 
    },
  }, 
  { toJSON: { virtuals: true } }
);
reservaSchema.method('getTemporadas', function(){
  // comparamos la finicio de la reserva con las fdesde de las temporadas
  return new Promise ( resolve => {
    TemporadasModel.find({})
      .then(tempDB => {
          const total = tempDB[0].temporada.length;
          let precioBase = 0;
          let finicRes =  new Date (this.temporada.finicio);
          let ffinRes =  new Date (this.temporada.ffin);
          let diasDif = 0;
          let np = this.temporada.npersonas - 4;
          let hoy =  Date.now();
          let ene1 = new Date (2020, 0, 2);
          let ene2 = ene1.setDate(ene1.getDate() + 30);
          diasDif = hoy - ene1.getTime();
          diasDif = Math.round(diasDif/(1000*60*60*24));
          console.log (hoy, ene1, diasDif, ene2);
       
          tempDB[0].temporada.forEach(function(temp: any){
            if ((finicRes.getTime() > temp.fdesde.getTime()) && (ffinRes.getTime() < temp.fhasta.getTime())){
              diasDif = ffinRes.getTime() - finicRes.getTime();
              diasDif = Math.round(diasDif/(1000*60*60*24));
              precioBase = (diasDif * temp.precioBase) + (diasDif*np*20);
            }
          })
          resolve (precioBase);
      });  
    })
});

reservaSchema.virtual('temporadas1')
  .get (async function(){
    const total = getTotalTemp();
    return (total);
  })


function getTotalTemp(){
  return new Promise ( resolve => {
    TemporadasModel.find({})
      .then(tempDB => {
          const total = tempDB[0].temporada.length;
          resolve (total);
      });  
    })
}

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
    //temporadas: Promise<number>;
    temporadas : number;
    dato:  Promise<number>;
    getTemporadas():  Promise<number>;
}

export const ReservasModel = model<IReserva>('Reservas', reservaSchema);