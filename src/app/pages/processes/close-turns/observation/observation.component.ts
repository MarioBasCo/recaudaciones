import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TurnsService } from '../../turns.service';
import { FormControl } from '@angular/forms';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-observation',
  templateUrl: './observation.component.html',
  styleUrls: ['./observation.component.scss']
})
export class ObservationComponent {
  public isLoading: boolean = false;
  public observacion: FormControl = new FormControl('');

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ObservationComponent>,
    private _svcTurn: TurnsService,
    private storage: StorageService,
    private toast: ToastService) {
  }

  get observacionField() {
    return this.observacion.getRawValue();
  }

  save() {
    this.isLoading = true;
    const info = {
      observacion: this.observacionField
    }
    this._svcTurn.cerrar(info, this.data).subscribe({
      next: (resp) => {
        this.isLoading = false;
        this.dialogRef.close(true);
        this.storage.remove('turn_pto');
        this.toast.openSnackBar(resp.message);
      },
      error: (err) => {
       
      }
    });
  }
}
