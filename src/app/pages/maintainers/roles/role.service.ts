import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  public baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getRoles(){
    const url = `${this.baseUrl}/roles`;
    return this.http.get<any>(url);
  }
}
