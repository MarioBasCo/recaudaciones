import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  path_base = environment.baseUrl;

  constructor(private http: HttpClient) { }

  tiposPorFechas(startDate: string, endDate: string){
    const url =  `${this.path_base}/reporte/garita/${startDate}/${endDate}`;
    return this.http.get<any>(url);
  }
}
