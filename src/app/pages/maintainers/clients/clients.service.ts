import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { Client } from "./client.interface";

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  public baseUrl = environment.baseUrl;

  private listaClienteSubject: BehaviorSubject<Client[]> = new BehaviorSubject<Client[]>([]);
  public listaCliente$: Observable<Client[]> = this.listaClienteSubject.asObservable();

  constructor(private http: HttpClient) { }

  getClients() {
    const url = `${this.baseUrl}/clientes`;
    return this.http.get<any>(url);
  }

  saveClient(data: any) {
    const url = `${this.baseUrl}/clientes`;
    return this.http.post<any>(url, data);
  }

  updateClient(id: number, data: any) {
    const url = `${this.baseUrl}/clientes/${id}`;
    return this.http.put<any>(url, data);
  }

  getTiposVehiculos() {
    const url = `${this.baseUrl}/tiposvehiculos`;
    return this.http.get<any>(url);
  }

  sharedList(list: Client[]) {
    this.listaClienteSubject.next(list);
  }

  eliminarCliente(id: number) {
    const url = `${this.baseUrl}/clientes/${id}`;
    return this.http.delete<any>(url);
  }

  asignarVehiculo(id: number, data: any) {
    const url = `${this.baseUrl}/clientes/${id}/vehiculos`;
    return this.http.post<any>(url, data);
  }

  updateVehiculo(id: number, data: any) {
    const url = `${this.baseUrl}/clientes/${id}/vehiculos/${data.id}`;
    return this.http.put<any>(url, data);
  }
}
