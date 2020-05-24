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
    precioTotal?: number | INumero;
    comision?: number | INumero;
    precioReal?: number | INumero;


}

export interface IReserva {
    _id?: string;
    cliente?: string;
    ciudad?: string;
    agencia?: string;
    temporada: ITemporada;
 }

export interface MsnAPIReserva {
     ok: string;
     mensaje?: string;
     reservasDB?: IReserva[];
 }


