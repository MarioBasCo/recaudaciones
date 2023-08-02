import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from 'src/app/auth/auth.service';
import { OptionsAlert } from 'src/app/components/alert-dialog/alert-dialog.component';
import { AlertService } from 'src/app/shared/services/alert.service';
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
    private _svcStorage: StorageService,
    private alert: AlertService) { }

  closeSession() {
    const opt: OptionsAlert = {
      title: '🔔 Cerrar Sesión 🔔',
      message: '¿Deseas cerrar sesión?',
      buttonText: {
        confirmButtonText: 'Cerrar Sesión',
        cancelButtonText: 'No'
      }
    };
    const dialogAlert = this.alert.open(opt);

    dialogAlert.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this._svcAuth.logout();
      }
    });
  }

  get user(){
    return this._svcStorage.get('user_pto')?.name || '';
  }
}
