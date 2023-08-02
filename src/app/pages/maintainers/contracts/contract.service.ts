import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  path_base = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getUsers(){
    const url = `${this.path_base}/users/sincontratos`;
    return this.http.get<any>(url);
  }

  getContratos() {
    const url = `${this.path_base}/contratos`;
    return this.http.get<any>(url);
  }

  saveContract(data: any) {
    const url = `${this.path_base}/contratos`;
    return this.http.post<any>(url, data);
  }

  eliminarContrato(id: number){
    const url = `${this.path_base}/contratos/${id}`;
    return this.http.delete<any>(url);
  }
}
