export  interface ITemporada {
    finicio?: Date;
    ffin?: Date;
    duracion?: number;
    mes?: number;
    anio?: number;
}

export interface IReserva {
    _id?: string;
    cliente?: string;
    agencia?: string;
    temporada: ITemporada;
 }

export interface MsnAPIReserva {
     ok: string;
     mensaje?: string;
     reservaDB?: IReserva;
 }


