export  interface ITemporada {
    year?: number;
    nombre?: string;
    precioBase?: number;
    precioAdic?: number;
    precioFSemana?: number;
    precioSemana?: number;
    fdesde?: Date;
    fhasta?: Date;
}

export interface ITemporadas{
    year?: number;
    temporada?: [ITemporada];
}

export interface MsnAPITemporada {
     ok: string;
     mensaje?: string;
     temporadasDB?: ITemporadas;
 }


