import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ToastService } from 'src/app/shared/services/toast.service';
import { cedulaValidation } from 'src/app/shared/utils/cedula-validator';
import { rucValidation } from 'src/app/shared/utils/ruc-validator';
import { Client, TipoVehiculo } from '../client.interface';
import { ClientsService } from '../clients.service';
import { OptionsAlert } from 'src/app/components/alert-dialog/alert-dialog.component';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { existsPlaqueValidator } from 'src/app/shared/utils/existsPlaqueValidator';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit, OnDestroy {
  public title: string = '';
  public clientForm: FormGroup;
  public clienteOriginal: any;
  public cambiosRealizados: boolean = false;
  public isLoading: boolean = false;
  public isEdit: boolean = false;
  public minLengtIdentification: number = 0;
  public validatorEcu!: ValidatorFn;
  public validIdentity: FormControl = new FormControl(null);
  public placaregex: RegExp = /^([A-Za-z]{3}-?\d{3,4}|(\d)\2{2}-\2{3})$/;
  public emailregex: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  public letterregex: string = "[A-Za-zÁÉÍÓÚáéíóúñÑ ]+";
  public phoneregex: string = "^0(9)[0-9\d]{8}$";
  private myFormValueChanges$!: Subscription;

  tiposVehiculo: TipoVehiculo[] = [];
  optDNI: string[] = ['Cedula', 'RUC'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Client,
    public dialogRef: MatDialogRef<ClientFormComponent>,
    public fb: FormBuilder,
    private toast: ToastService,
    private _svcClient: ClientsService,
    private alert: AlertService,
    private _svcValid: ValidatorsService
  ) {
    this.clientForm = this.createForm();
    this.title = this.data ? 'Actualización de Datos' : 'Nuevo Registro';
  }

  ngOnInit() {
    this._svcClient.getTiposVehiculos().subscribe(resp => {
      this.tiposVehiculo = resp;
    });

    this.editSetvalueForm();
    this.clienteOriginal = { ...this.clientForm.value };

    this.myFormValueChanges$ = this.clientForm.controls['idTipoIdentificacion'].valueChanges.subscribe(valor => this.changeValidatorsIdentification(valor));

    this.clientForm.valueChanges.subscribe(() => {
      this.verificarCambios();
    });
  }

  verificarCambios() {
    const cambios = JSON.stringify(this.clientForm.value) !== JSON.stringify(this.clienteOriginal);
    this.cambiosRealizados = cambios;
  }

  editSetvalueForm() {
    if (this.data) {
      const valueIDE = this.data.identificacion.length == 10 ? 'Cedula' : 'RUC';

      this.clientForm.get('idTipoIdentificacion')?.setValue(valueIDE);
      this.changeValidatorsIdentification(valueIDE);
      if (this.data.vehiculos.length > 1) {
        for (let i = 0; i < this.data.vehiculos.length - 1; i++) {
          this.addCar();
        }
      }
      this.clientForm.patchValue(this.data);
      this.checkInvalidDNI();
    }
  }

  checkInvalidDNI() {
    if (this.identificacion?.invalid)
    this.validIdentity.setValue(true);
    this.identificacion?.removeValidators(this.validatorEcu);
  }

  createForm(): FormGroup {
    return this.fb.group({
      cliente_id: [null],
      idTipoIdentificacion: [null, [Validators.required]],
      celular: ['', [Validators.pattern(this.phoneregex)]],
      correo: ['', [Validators.email, Validators.pattern(this.emailregex)]],
      identificacion: [{ value: null, disabled: true }, [Validators.required]],
      vehiculos: this.fb.array([this.initFormCar()], [Validators.required]),
    });
  }

  initFormCar(): FormGroup {
    return new FormGroup({
      id: new FormControl(null),
      idTipoVehiculo: new FormControl('', [Validators.required]),
      placa: new FormControl('',
        {
          validators: [
            Validators.required,
            Validators.pattern(this.placaregex)
          ],
          asyncValidators: [
            existsPlaqueValidator(this._svcValid)
          ],
          updateOn: 'blur',
        }
      )
    });
  }

  get identificacion() {
    return this.clientForm.get('identificacion');
  }

  getCtrl(key: string, form: FormGroup): any {
    return form.get(key);
  }

  addCar() {
    const vehiculos = this.clientForm.get('vehiculos') as FormArray;
    vehiculos.push(this.initFormCar());
  }

  removeCar(i: number) {
    const vehiculos = this.clientForm.get('vehiculos') as FormArray;
    const refSingle = vehiculos.at(i) as FormGroup;

    if (refSingle.get('id')?.value) {
      const dialogAlert = this.deleteCar();
      dialogAlert.afterClosed().subscribe((confirmed: boolean) => {
        if (confirmed) {
          vehiculos.removeAt(i);
        }
      });
    } else {
      vehiculos.removeAt(i);
    }
  }

  deleteCar() {
    const opt: OptionsAlert = {
      title: '❌ Eliminar Registro ❌',
      message: '¿Deseas eliminar este vehículo, los cambios se verán reflejados al presionar el botón guardar?'
    };
    return this.alert.open(opt);
  }

  private changeValidatorsIdentification(valor: string) {
    this.validIdentity.setValue(null);
    let objetivoControl = this.identificacion;
    objetivoControl?.setValue(null);
    objetivoControl?.enable();
    objetivoControl?.clearValidators();

    switch (valor) {
      case "Cedula":
        this.clientForm?.removeControl("razon_social");
        this.clientForm.addControl("nombres", new FormControl('', [Validators.required, Validators.pattern(this.letterregex), Validators.minLength(3)]));
        this.clientForm.addControl("apellidos", new FormControl('', [Validators.required, Validators.pattern(this.letterregex), Validators.minLength(3)]));
        this.minLengtIdentification = 10;
        this.validatorEcu = cedulaValidation();
        break;
      case "RUC":
        this.clientForm?.removeControl("nombres");
        this.clientForm?.removeControl("apellidos");
        this.clientForm.addControl("razon_social", new FormControl('', [Validators.required, Validators.minLength(3)]));
        this.minLengtIdentification = 13;
        this.validatorEcu = rucValidation();
        break;
    }

    objetivoControl?.setValidators([
      Validators.required,
      Validators.minLength(this.minLengtIdentification),
      Validators.pattern("^[0-9]*$"),
      this.validatorEcu
    ]);

    objetivoControl?.markAsDirty()
    objetivoControl?.updateValueAndValidity();
  }

  checkNoValidate(ev: any) {
    let objetivoControl = this.identificacion;
    if (ev.checked) {
      objetivoControl?.removeValidators(this.validatorEcu);
    } else {
      objetivoControl?.addValidators(this.validatorEcu);
    }
    objetivoControl?.markAsDirty();
    objetivoControl?.updateValueAndValidity();
  }

  save() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      console.log(this.clientForm.value);
      this.toast.openSnackBar('Registro guardado con éxito');
      this.dialogRef.close();
    }, 500);
  }

  checkErrorForm = (controlName: string, errorName: string) => {
    return this.clientForm.controls[controlName].hasError(errorName);
  };

  getErrorTipoIdentificacion() {
    return this.checkErrorForm('idTipoIdentificacion', 'required')
      ? 'El campo tipo de identificación es requerido'
      : '';
  }

  getErrorIdentificacion() {
    return this.checkErrorForm('identificacion', 'required')
      ? 'El campo identificación es requerido'
      : this.checkErrorForm('identificacion', 'pattern')
        ? 'El campo debe ser númerico'
        : this.checkErrorForm('identificacion', 'minlength')
          ? `El campo debe contener ${this.minLengtIdentification} de digitos`
          : this.checkErrorForm('identificacion', 'ecuadorianValid')
            ? `No parece ser ${this.minLengtIdentification == 10 ? 'una cedula válida' : 'un ruc válido'}`
            : '';
  }

  getErrorNombres() {
    return this.checkErrorForm('nombres', 'required')
      ? 'El campo nombres es requerido'
      : this.checkErrorForm('nombres', 'pattern')
        ? 'El campo debe contener solo letras'
        : '';
  }

  getErrorApellidos() {
    return this.checkErrorForm('apellidos', 'required')
      ? 'El campo apellidos es requerido'
      : this.checkErrorForm('apellidos', 'pattern')
        ? 'El campo debe contener solo letras'
        : '';
  }

  getErrorRazon() {
    return this.checkErrorForm('razon_social', 'required')
      ? 'El campo Razón Social es requerido'
      : '';
  }

  getErrorCorreo() {
    return this.checkErrorForm('correo', 'email') || this.checkErrorForm('correo', 'pattern')
      ? 'El campo correo debe tener un formato válido'
      : '';
  }

  getErrorCelular() {
    return this.checkErrorForm('celular', 'pattern')
      ? 'El campo celular debe empezar con 09... y tener 10 digitos'
      : '';
  }

  ngOnDestroy(): void {
    this.myFormValueChanges$.unsubscribe();
  }
}
