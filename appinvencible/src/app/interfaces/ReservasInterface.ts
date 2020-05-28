export interface INumero {
    valor?: number | Date;
    operador?: string;
}

export  interface ITemporada {
    finicio?: Date | INumero;
    ffin?: Date | INumero;
    duracion?: number | INumero;
    mes?: number;
    anio?: number | INumero;
    npersonas?: number | INumero;
    precioTotal?: number ;
    comision?: number ;
    precioReal?: number ;
    temporadas?: number;
}

export interface IReserva {
    _id?: string;
    cliente?: string;
    ciudad?: string;
    agencia?: string;
    temporada: ITemporada;
    temporadas?: number;
 }

export interface MsnAPIReserva {
     ok: string;
     mensaje?: string;
     reservasDB?: IReserva[];
 }


