import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VehicleTypesService } from './vehicle-types.service';
import { FormTypesVehicleComponent } from './form-types-vehicle/form-types-vehicle.component';
import { OptionsAlert } from 'src/app/components/alert-dialog/alert-dialog.component';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'vehicle-types',
  templateUrl: './vehicle-types.component.html',
  styleUrls: ['./vehicle-types.component.scss']
})
export class VehicleTypesComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private _svcVehicleType: VehicleTypesService,
    private alert: AlertService,
    private toast: ToastService) {

  }

  ngOnInit() {
    this.chargeInitData();
  }

  chargeInitData() {
    this._svcVehicleType.getTipos().subscribe(resp => {
      this._svcVehicleType.sharedList(resp);
    });
  }

  openDialogType(data: any = null) {
    const dialogRef = this.dialog.open(FormTypesVehicleComponent, {
      data,
      width: '360px',
      minWidth: 'auto'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this._svcVehicleType.getTipos().subscribe(resp => {
          this._svcVehicleType.sharedList(resp);
        });
      }
    });
  }

  deleteRaw(data: any) {
    const opt: OptionsAlert = {
      title: '❌ Eliminar Registro',
      message: '¿Deseas eliminar este registro?'
    };
    const dialogAlert = this.alert.open(opt);

    dialogAlert.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this._svcVehicleType.deleteTipo(data.id).subscribe(resp => {
          this.toast.openSnackBar(resp.message);
          this.chargeInitData();
        });
      }
    });
  }
}
