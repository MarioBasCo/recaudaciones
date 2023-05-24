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

  getClients(){
    const url = `${this.baseUrl}/clientes`;
    return this.http.get<any>(url);
  }

  getTiposVehiculos(){
    const url =  `${this.baseUrl}/tiposvehiculos`;
    return this.http.get<any>(url);
  }

  sharedList(list: Client[]){
    this.listaClienteSubject.next(list);
  }
}
