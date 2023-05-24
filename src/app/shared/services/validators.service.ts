import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor(private http: HttpClient) { }

  checkIfPlaqueExists(value: string): Observable<boolean> {
    const url = `http://127.0.0.1:8000/api/vehiculos/${value}`;
    return this.http.get<boolean>(url);
  }
}
