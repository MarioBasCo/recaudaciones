import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RentService {
  path_base = environment.baseUrl;

  constructor(private http: HttpClient ) { }

  getArriendos(){
    const url = `${this.path_base}/arriendos`;
    return this.http.get<any>(url);
  }

  getLocales() {
    const url = `${this.path_base}/arriendos/locales`;
    return this.http.get<any>(url);
  }

  guardarArriendo(data: any){
    const url = `${this.path_base}/arriendos`;
    return this.http.post<any>(url, data);
  }

  eliminarArriendo(id: string) {
    const url = `${this.path_base}/arriendos/${id}`;
    return this.http.delete<any>(url);
  }

  buscarPersona(cedula: string){
    const url = `${this.path_base}/personas/buscar/${cedula}`;
    return this.http.get<any>(url);
  }

  getMensualidades(){
    const url = `${this.path_base}/arriendos/pagos/mensuales`;
    return this.http.get<any>(url);
  }

  getContratosArriendo(){
    const url = `${this.path_base}/arriendos/contratos`;
    return this.http.get<any>(url);
  }

  guardarPago(data: any) {
    const url = `${this.path_base}/arriendos/pagos`;
    return this.http.post<any>(url, data);
  }

  enviarNotificacion(data: any){
    const url = `${this.path_base}/enviar-correo`;
    return this.http.post<any>(url, data);
  }
}
