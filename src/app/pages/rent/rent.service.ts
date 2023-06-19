import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RentService {
  path_base = environment.baseUrl;

  constructor(private http: HttpClient ) { }

  getArriendos(){
    const url = `${this.path_base}/arriendos`;
    return this.http.get<any>(url);
  }
}
