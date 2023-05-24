import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TurnsService {
  constructor(private http: HttpClient) { }

  consultaPlaca(placa: string) {
    const url = `http://localhost:8000/api/vehiculos/datos/${placa}`;
    return this.http.get<any>(url);
  }
}
