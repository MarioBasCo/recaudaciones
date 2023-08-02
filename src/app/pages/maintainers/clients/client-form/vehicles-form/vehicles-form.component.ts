import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { existsPlaqueValidator } from 'src/app/shared/utils/existsPlaqueValidator';
import { Client, TipoVehiculo } from '../../client.interface';
import { ClientsService } from '../../clients.service';
import { OptionsAlert } from 'src/app/components/alert-dialog/alert-dialog.component';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-vehicles-form',
  templateUrl: './vehicles-form.component.html',
  styleUrls: ['./vehicles-form.component.scss']
})
export class VehiclesFormComponent {
  @Input() info!: Client;
  @Input() clientId!: number;
  vehicleForm!: FormGroup;
  vehicleList!: FormArray;
  public placaregex: RegExp = /^([A-Za-z]{3}-?\d{3,4}|(\d)\2{2}-\2{3})$/;
  tiposVehiculo: TipoVehiculo[] = [];
  private originalFormValue: any;

  constructor(
    private fb: FormBuilder,
    private alert: AlertService,
    private _svcClient: ClientsService,
    private _svcValid: ValidatorsService,
    private toast: ToastService) {
    this.vehicleList = this.fb.array([]);

    this.vehicleForm = this.fb.group({
      vehiculos: this.vehicleList
    });
  }

  ngOnInit() {
    this.clientId = this.clientId || this.info?.cliente_id;

    this._svcClient.getTiposVehiculos().subscribe(resp => {
      this.tiposVehiculo = resp;
    });
    if (this.info?.vehiculos) {
      for (let i = 0; i < this.info.vehiculos.length; i++) {
        this.addVehicleEdit(this.info.vehiculos[i]);
      }
      this.vehicleList.disable();
    }
  }

  initFormCar(initValue: any | null = null): FormGroup {
    return new FormGroup({
      id: new FormControl(initValue?.id ?? null),
      idTipoVehiculo: new FormControl(initValue?.idTipoVehiculo ?? null, [Validators.required]),
      placa: new FormControl(initValue?.placa ?? null,
        {
          validators: [
            Validators.required,
            Validators.pattern(this.placaregex)
          ],
          asyncValidators: [
            existsPlaqueValidator(this._svcValid, initValue?.placa)
          ],
          updateOn: 'blur',
        }
      ),
      editing: new FormControl(true)
    });
  }

  get vehiculos() {
    return this.vehicleList.controls;
  }

  addVehicle() {
    this.disableExistingFormButtons(); 
    this.vehicleList.push(this.initFormCar());
  }

  addVehicleEdit(value: any) {
    /* const formGroup = this.initFormCar();
    formGroup.patchValue(value);
    this.vehicleList.push(formGroup); */
    this.vehicleList.push(this.initFormCar(value));
  }

  disableExistingFormButtons() {
    this.vehicleList.controls.forEach((control) => {
      control.get('editing')?.setValue(false);
    });
  }

  saveVehicle(i: number) {
    const refSingle = this.vehicleList.at(i) as FormGroup;
    const data = refSingle.value;
    if (this.clientId) {
      this._svcClient.asignarVehiculo(this.clientId, data).subscribe(resp => {
        this.toast.openSnackBar(resp.message);
        refSingle.get('id')?.setValue(resp.data);
        refSingle.disable();
      });
    }
  }

  enableEditing(index: number) {
    const refSingle = this.vehicleList.at(index) as FormGroup;
    refSingle.enable();
    this.originalFormValue = { ...refSingle.value };
    this.vehicleList.controls.forEach((control, i) => {
      if (i !== index) {
        control.get('editing')?.setValue(false);
        control.disable();
      }
    });
  }

  updateVehicle(index: number) {
    const refSingle = this.vehicleList.at(index) as FormGroup;
    refSingle.disable();
    const data = refSingle.value;
    this._svcClient.updateVehiculo(this.clientId, data).subscribe(resp => {
      this.toast.openSnackBar(resp.message);
      this.activateControls();
    });
  }

  cancelEditing(index: number) {
    const refSingle = this.vehicleList.at(index) as FormGroup;
    refSingle.patchValue(this.originalFormValue);
    refSingle.disable();
    this.activateControls();
  }

  activateControls() {
    this.vehicleList.controls.forEach((control) => {
      control.get('editing')?.setValue(true);
    });
  }

  hasChanges(vehicle: any): boolean {
    const originalValue = this.originalFormValue;
    return !vehicle.value || JSON.stringify(vehicle.value) !== JSON.stringify(originalValue);
  }

  deleteVehicle(index: number) {
    const refSingle = this.vehicleList.at(index) as FormGroup;

    if (refSingle.get('id')?.value) {
      const dialogAlert = this.deleteVehicleAlert();
      dialogAlert.afterClosed().subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.vehicleList.removeAt(index);
        }
      });
    }
  }

  removeVehicle(index: number) {
    this.activateControls();
    this.vehicleList.removeAt(index);
  }

  deleteVehicleAlert() {
    const opt: OptionsAlert = {
      title: '❌ Eliminar Registro ❌',
      message: '¿Deseas eliminar este vehículo?'
    };
    return this.alert.open(opt);
  }
}
