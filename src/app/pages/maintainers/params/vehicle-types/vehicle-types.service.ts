import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TipoVehiculo } from '../../clients/client.interface';

@Injectable({
  providedIn: 'root'
})
export class VehicleTypesService {
  public baseUrl = environment.baseUrl;

  private listTypeVehicleSubject: BehaviorSubject<TipoVehiculo[]> = new BehaviorSubject<TipoVehiculo[]>([]);
  public listTypes$: Observable<TipoVehiculo[]> = this.listTypeVehicleSubject.asObservable();

  constructor(private http: HttpClient) { }

  getTipos() {
    const url = `${this.baseUrl}/tiposvehiculos`;
    return this.http.get<any>(url);
  }

  createTipo(data: any){
    const url = `${this.baseUrl}/tiposvehiculos`;
    return this.http.post<any>(url, data);
  }

  updateTipo(data: any, id: number){
    const url = `${this.baseUrl}/tiposvehiculos/${id}`;
    return this.http.put<any>(url, data);
  }

  deleteTipo(id: number){
    const url = `${this.baseUrl}/tiposvehiculos/${id}`;
    return this.http.delete<any>(url);
  }

  sharedList(list: TipoVehiculo[]) {
    this.listTypeVehicleSubject.next(list);
  }
}
