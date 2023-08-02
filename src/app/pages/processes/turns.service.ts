import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TurnsService {
  path_base = environment.baseUrl;

  constructor(private http: HttpClient) { }

  consultaPlaca(placa: string) {
    const url = `${this.path_base}/vehiculos/datos/${placa}`;
    return this.http.get<any>(url);
  }

  totalesPorTipo(turno_id: number) {
    const url = `${this.path_base}/turnos/${turno_id}`;
    return this.http.get<any>(url);
  }

  aperturar(data: any) {
    const url = `${this.path_base}/turnos/apertura`;
    return this.http.post<any>(url, data);
  }

  cerrar(data: any, turno_id: number) {
    const url = `${this.path_base}/turnos/cierre/${turno_id}`;
    return this.http.post<any>(url, data);
  }

  turnoAbierto(data: any) {
    const url = `${this.path_base}/turnos/abierto`;
    return this.http.post<any>(url, data);
  }

  guardarCobro(data: any) {
    const url = `${this.path_base}/cobro`;
    return this.http.post<any>(url, data);
  }
}
