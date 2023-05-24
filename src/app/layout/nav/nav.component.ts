import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from 'src/app/auth/auth.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  @Input() sidenav!: MatSidenav;
  
  constructor(
    private _svcAuth: AuthService,
    private _svcStorage: StorageService) { }

  closeSession() {
    this._svcAuth.logout();
  }

  get user(){
    return this._svcStorage.get('user_pto').name;
  }
}
