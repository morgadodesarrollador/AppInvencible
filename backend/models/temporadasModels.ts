import { Schema, model, Document } from 'mongoose';

const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre",
"Octubre", "Noviembre", "Diciembre"];

const diaSchema = new Schema ({
  dia: { type: Date, default: null }, 
  diaSt: { type: String }, 
  temp: { type: Number } 
})

const temporadaSchema = new Schema({
  nombre: { type: String },
  item: { type: Number },
  precioBase: { type: Number },
  precioAdic: { type: Number },
  precioSemana: { type: Number },
  precioFSemana: { type: Number },
  fdesde: { type: Date },
  fhasta: { type: Date },
  ndiaInicial: { type: Number },
  ndiaFinal: { type: Number }
})


const temporadasSchema  = new Schema({
  year: { type: Number  },             
  dias: { type: [diaSchema], set: setDias},          
  temporada: [{ type: temporadaSchema }],             
});
temporadasSchema.method('addTemporada', addTemporada);
temporadasSchema.method('uptTemporada', uptTemporada);
temporadasSchema.method('getNdia', getNdia);

function setDias(){
    console.log ("-->", this.year);
    let ene1 = new Date(this.year, 0, 2); // primer dia del año 
    let dias = new Array(365);
    let d:Date = new Date;
    
    for (let i = 0; i < 365; i++) {
      d = new Date (this.year, 0, i + 2); // número de dia
      dias.push({
          dia: d,
          diaSt: meses[d.getMonth()] + '/' + d.getDate() + '/' + d.getFullYear(),
          temp: 0
      });
    }
    return (dias);
}

function setFecha (fecha:Date){
    return fecha.getDate() + '/'  + (fecha.getMonth()+1) + '/'  + fecha.getFullYear();
}

function getNdia(year: number, fecha: Date){
  let ene1= new Date(year,0,2);
  var finicio = fecha.toString().split("-");
  console.log (ene1, finicio);
  let dia: Date = new Date(parseInt(finicio[0]),parseInt(finicio[1])-1,parseInt(finicio[2])+1);
  let diasDif = dia.getTime() - ene1.getTime();
  diasDif = Math.round(diasDif/(1000*60*60*24));
  return diasDif
}
function uptTemporada(temporada: any, idTemp: Number){
    // actualiza el calendario modifican la temporada que corresponden a los dias
    // 2020-05-01 --> [ '2020', '05', '01' ] -> new Date (2020, 4, 1) -> 2020-05-01T22:00:00.000Z
    //new Date(2020,0,2) --> 2020/01/01
    let dia: Date;
    let diasDif = 0;
    let i = 0;
    console.log("tramo1 -->", temporada.fdesde.toString(),temporada.fhasta.toString());
    var finicio = temporada.fdesde.toString().split("-");
    var ffin = temporada.fhasta.toString().split("-");
    console.log ("tramo2 -->",finicio, ffin);
    let ene1= new Date(this.year,0,2);
    let diaInicio: Date = new Date(parseInt(finicio[0]),parseInt(finicio[1])-1,parseInt(finicio[2])+1);
    let diaFin: Date = new Date(parseInt(ffin[0]),parseInt(ffin[1])-1,parseInt(ffin[2])+1);
    console.log("tramo3 -->", diaInicio, diaFin);
    dia = diaInicio;
    let c = 0;
    while (dia <= diaFin) {
        diasDif = dia.getTime() - ene1.getTime();
        diasDif = Math.round(diasDif/(1000*60*60*24));
        this.dias[diasDif - 1].temp = idTemp;
        if ( c == 0){
          temporada.ndiaInicial = (diasDif - 1);
        }
        console.log (dia, diasDif - 1, this.dias[diasDif - 1].temp);
        dia.setDate(dia.getDate() + 1);
        c++;
    }
    temporada.ndiaFinal = (diasDif - 1);
    return temporada;
}
function addTemporada(idTemp: number, temporada: ITemporada){
    let respuesta:any;
   
    // añade al final del array de temporadas de  ese año
    temporada.item = idTemp;
    console.log("ntemp --->", idTemp);
    // modificamos en el calendario la temporada vigente en esas fechas
    return this.uptTemporada(temporada, idTemp);
}

export const TemporadasModel = model<ITemporadaYear>('Temporadas', temporadasSchema);

export  interface IDia{
  dia?: Date;
  disSt: String;
  temp?: string;
}

export  interface ITemporada{
  _id?:  string;
  nombre?: String;
  precioBase?: number;
  precioAdic?: number;
  precioFSemana?: number;
  precioSemana?: number;
  fdesde?: Date;
  fhasta?: Date;
  item?: Number;
  ndiaInicial?: Number;
  ndiaFinal?:Number;
}

export  interface ITemporadaYear extends Document{
  year: Number;
  dias: [IDia];
  temporada: [ITemporada];
  addTemporada(year: number, temporada: ITemporada): any;
  uptTemporada(temporada: ITemporada, idTemp: Number): any;
  getNdia(year: number, dia: string): number;
}