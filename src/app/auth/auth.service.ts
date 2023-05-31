import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../shared/services/storage.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private _svcStorage: StorageService,
    private router: Router) { }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token_pto');
    return !!token;
  }

  login(data: any) {
    const url = `${this.baseUrl}/login`;
    return this.http.post<any>(url, data);
  }

  logout(){
    this._svcStorage.remove('user_pto');
    this._svcStorage.remove('token_pto');
    this.router.navigateByUrl('/auth', { replaceUrl: true });
  }
}
