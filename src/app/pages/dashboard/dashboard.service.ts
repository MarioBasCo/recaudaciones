import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  path = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getInfo() {
    const url = `${this.path}/dashboard`;
    return this.http.get<any>(url);
  }
}
