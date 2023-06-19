import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {
  path_base = environment.baseUrl;

  constructor(private http: HttpClient) { }

  checkIfPlaqueExists(value: string): Observable<boolean> {
    const url = `${this.path_base}/vehiculos/${value}`;
    return this.http.get<boolean>(url);
  }

  checkIfRucExists(value: string): Observable<boolean> {
    const url = `${this.path_base}/clientes/existe/ruc/${value}`;
    return this.http.get<boolean>(url);
  }

  checkIfCedulaExists(value: string): Observable<boolean> {
    const url = `${this.path_base}/clientes/existe/cedula/${value}`;
    return this.http.get<boolean>(url);
  }
}
