import { Schema, model, Document } from 'mongoose';

const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre",
"Octubre", "Noviembre", "Diciembre"];
const diaSchema = new Schema ({
    dia: { type: Date, default: null },
    diaSt: { type: String },
    temp: { type: Number }
})
export  interface IDia{
    dia?: Date;
    temp?: string;
}

const temporada = new Schema({
    nombre: { type: String },
    precioBase: { type: Number },
    precioAdic: { type: Number },
    precioSemana: { type: Number },
    precioFSemana: { type: Number },
    fdesde: { type: Date },
    fhasta: { type: Date }
})

const temporadasSchema  = new Schema({
    year: { type: Number,  set: setDias },
    dias: { type: [diaSchema], setDias},
    temporada: [{ type: temporada }],
});

function setDias(dias: Array<IDia>){
    let ene1 = new Date(2020, 0, 2);
    this.dias = new Array(365);
    let d:Date = new Date;
    for (let i = 0; i < 365; i++) {
            d = new Date (2020, 0, i + 2);
            this.dias.push({
                dia: d,
                diaSt: meses[d.getMonth()] + '/' + d.getDate(),
                temp: 0
            });
    }
}


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
    addTemporada(year: number, temporada: ITemporada): any;
    uptTemporada(temporada: ITemporada, idTemp: Number): any;

}

function setFecha (fecha:Date){
    return fecha.getDate() + '/'  + (fecha.getMonth()+1) + '/'  + fecha.getFullYear();
}

temporadasSchema.method('addTemporada', addTemporada);
temporadasSchema.method('uptTemporada', uptTemporada);


function uptTemporada(temporada: any, idTemp: Number){
    // 2020-05-01 --> [ '2020', '05', '01' ] -> new Date (2020, 4, 1) -> 2020-05-01T22:00:00.000Z
    //new Date(2020,0,2) --> 2020/01/01
    let dia: Date;
    let diasDif = 0;
    let i = 0;
    console.log("-->", temporada.fdesde.toString(),temporada.fhasta.toString());
    var finicio = temporada.fdesde.toString().split("-");
    var ffin = temporada.fhasta.toString().split("-");
    console.log ("-->",finicio, ffin);
    let ene1= new Date(2020,0,2);
    let diaInicio: Date = new Date(parseInt(finicio[0]),parseInt(finicio[1])-1,parseInt(finicio[2])+1);
    let diaFin: Date = new Date(parseInt(ffin[0]),parseInt(ffin[1])-1,parseInt(ffin[2])+1);
    console.log("-->", diaInicio, diaFin);
    dia = diaInicio;
    console.log (this.dias[121]);
    while (dia <= diaFin) {
        diasDif = dia.getTime() - ene1.getTime();
        diasDif = Math.round(diasDif/(1000*60*60*24));
        
        this.dias[diasDif].temp = idTemp;
        console.log (dia, diasDif, this.dias[diasDif].temp);
        dia.setDate(dia.getDate() + 1);
    }
}
function addTemporada(year: number, temporada: ITemporada){
    let respuesta:any;
    
    const temporadaYear = new TemporadasModel();
    temporadaYear.year = 2020;
    console.log ('-->3');
    TemporadasModel.findOne({year}, (err, temporadasDB) => {
        if ( err ) throw err; 
        if (temporadasDB) {
            console.log('-->1');
            temporadasDB.temporada.push(temporada);
            const idTemp = temporadasDB.temporada.length-1;
            temporadasDB.uptTemporada(temporada, idTemp);
            TemporadasModel.findByIdAndUpdate(temporadasDB._id,temporadasDB,{ new: true }, (err, temporadasDB) =>{
              if ( err ) throw err; 
              respuesta = {
                ok: true,
                mensaje: 'Temporada insertada', 
                temporadasDB: temporadasDB
              }
              return (respuesta);
            })   
          }else{
            temporadaYear.temporada.push(temporada);
            console.log('adfadsfsadfs');
            TemporadasModel.create(temporadaYear)
              .then( temporadaDB => {
                respuesta = {
                  ok: true,
                  mensaje: 'Temporada Creada', 
                  userDB: temporadaDB
                }
                return (respuesta);
              }).catch( err => {
                respuesta = {
                  ok: false,
                  mensaje: 'temporada no insertada ...'
                }
                return (respuesta);
              })
          }
    })
}


export const TemporadasModel = model<ITemporadaYear>('Temporadas', temporadasSchema);