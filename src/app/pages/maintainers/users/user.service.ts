import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from './user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public baseUrl = environment.baseUrl;

  private listUserSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  public listUser$: Observable<IUser[]> = this.listUserSubject.asObservable();

  constructor(private http: HttpClient) { }

  getUsers(){
    const url = `${this.baseUrl}/users`;
    return this.http.get<any>(url);
  }

  getTiposVehiculos(){
    const url =  `${this.baseUrl}/tiposvehiculos`;
    return this.http.get<any>(url);
  }

  sharedList(list: IUser[]){
    this.listUserSubject.next(list);
  }

  createUser(data: any){
    const url =  `${this.baseUrl}/users`;
    return this.http.post<any>(url, data);
  }

  updateUser(data: any, id: number){
    const url =  `${this.baseUrl}/users/${id}`;
    return this.http.put<any>(url, data);
  }

  eliminarUser(id: number){
    const url =  `${this.baseUrl}/users/${id}`;
    return this.http.delete<any>(url);
  }
}
