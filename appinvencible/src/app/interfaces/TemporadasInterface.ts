export  interface ITemporada {
    year?: number;
    nombre?: string;
    precioBase?: number;
    precioAdic?: number;
    precioFSemana?: number;
    precioSemana?: number;
    fdesde?: string;
    fhasta?: string;
    item?: number;
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


