import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VehicleTypesService } from '../vehicle-types.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-form-types-vehicle',
  templateUrl: './form-types-vehicle.component.html',
  styleUrls: ['./form-types-vehicle.component.scss']
})
export class FormTypesVehicleComponent {
  typeForm: FormGroup;
  title: string = '';
  isLoading: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<FormTypesVehicleComponent>,
  private fb: FormBuilder,
  private _svcVehicleType: VehicleTypesService,
  private toast: ToastService){
    this.title = data ? 'Editar Registro' : 'Nuevo Registro';
    this.typeForm = this.fb.group({
      detalle: [data?.detalle, Validators.required],
      valor: [data?.valor, [Validators.required]]
    });
  }

  get detalle(){
    return this.typeForm.get('detalle');
  }

  get valor(){
    return this.typeForm.get('valor');
  }

  save(){
    const data = this.typeForm.value;

    if(!this.data){
      this._svcVehicleType.createTipo(data).subscribe(resp => {
        //console.log(resp);
        if(resp.status){
          this.toast.openSnackBar(resp.message);
          this.dialogRef.close(resp.data);
        }
      });
    } else {
      this._svcVehicleType.updateTipo(data, this.data.id).subscribe(resp => {
        if(resp.status){
          this.toast.openSnackBar(resp.message);
          this.dialogRef.close(resp.data);
        }
      })
    }
  }
}
