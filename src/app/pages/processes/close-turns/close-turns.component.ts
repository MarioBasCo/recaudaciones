import { Component } from '@angular/core';
import { TurnsService } from '../turns.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { MatDialog } from '@angular/material/dialog';
import { ObservationComponent } from './observation/observation.component';

@Component({
  selector: 'app-close-turns',
  templateUrl: './close-turns.component.html',
  styleUrls: ['./close-turns.component.scss']
})
export class CloseTurnsComponent {
  datos: any[] = [];
  public turnoActual: number = 0;
  public aperturado: boolean = false;

  constructor(
    private storage: StorageService,
    private _svcTurn: TurnsService,
    public dialog: MatDialog,) {

  }

  ngOnInit() {
    this.getTurnoActual();

    this.turnoActual = this.storage.get('turn_pto');
    if (this.turnoActual) {
      this.aperturado = true;
    }
    this.cargarTotales();
  }

  cargarTotales() {
    this._svcTurn.totalesPorTipo(this.turnoActual).subscribe(resp => {
      this.datos = resp;
    });
  }

  getTurnoActual() {
    const user = this.storage.get('user_pto');
    const data = { user_id: user?.id };
    this._svcTurn.turnoAbierto(data).subscribe(
      {
        next: (resp) => {
          if (resp.turno) {
            this.storage.set('turn_pto', resp.turno.id);
          }
        },
        error: (err) => {
          this.aperturado = false;
          this.storage.set('turn_pto', 0);
        }
      }
    );
  }

  openDialogClose() {
    const dialogRef = this.dialog.open(ObservationComponent, {
      data: this.turnoActual,
      width: '300px',
      minWidth: 'auto'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.aperturado = !res;
        this.turnoActual = 0;
        this.cargarTotales();
      }
    });
  }
}
