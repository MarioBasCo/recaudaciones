import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RentService } from '../rent.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent {
  formularioArriendo: FormGroup;
  arriendos: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PaymentFormComponent>,
    private formBuilder: FormBuilder,
    private _svcRent: RentService,
    private storage: StorageService,
    private toast: ToastService) {
    this.formularioArriendo = this.formBuilder.group({
      user_id: [null, Validators.required],
      arriendo_id: [null, Validators.required],
      monto: [null, [Validators.required, Validators.min(0.01)]],
      observacion: [null]
    });
  }

  ngOnInit(): void {
    const user = this.storage.get('user_pto');
    this.formularioArriendo.get('user_id')?.setValue(user.id);
    this._svcRent.getContratosArriendo().subscribe(resp => {
      this.arriendos = resp;
    });
  }

  guardarArriendo() {
    if (this.formularioArriendo.valid) {
      const data = this.formularioArriendo.value;

      this._svcRent.guardarPago(data).subscribe({
        next: (resp) => {
          this.dialogRef.close(true);
          this.toast.openSnackBar(resp.message);
        },
        error: (err) => {
          if(err.status == 400){
            this.toast.openSnackBar(err.error.error, 'warning')
          }
          console.log(err);
        }
      })
    }
  }

  cancelar() {
    // Cerrar el diálogo sin guardar
    this.dialogRef.close();
  }
}
