import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const URL = environment.url;
@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  constructor(private http: HttpClient) { }

  getReservas(){
    console.log('reservas');
    return this.http.get(`${ URL }/usuarios/new`);
  }
}
