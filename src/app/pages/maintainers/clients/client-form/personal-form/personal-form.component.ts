import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { Subscription, catchError, throwError } from 'rxjs';
import { cedulaValidation } from 'src/app/shared/utils/cedula-validator';
import { rucValidation } from 'src/app/shared/utils/ruc-validator';
import { ClientsService } from '../../clients.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Client } from '../../client.interface';
import { existsRucValidator } from 'src/app/shared/utils/existsRucValidator';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { existsCedulaValidator } from 'src/app/shared/utils/existsCedulaValidator';

@Component({
  selector: 'app-personal-form',
  templateUrl: './personal-form.component.html',
  styleUrls: ['./personal-form.component.scss']
})
export class PersonalFormComponent implements OnInit {
  clientForm!: FormGroup;
  @Input() info!: Client;
  @Output() onCar: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() nuevoReg: EventEmitter<number> = new EventEmitter<number>();
  btnText: string = '';

  public clienteOriginal: any;
  public cambiosRealizados: boolean = false;
  public isLoading: boolean = false;
  public isEdit: boolean = false;
  public minLengtIdentification: number = 0;
  public validatorEcu!: ValidatorFn;
  public validatorIdentificacion!: AsyncValidatorFn;
  public validIdentity: FormControl = new FormControl(null);
  public emailregex: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  public letterregex: string = "[A-Za-zÁÉÍÓÚáéíóúñÑ ]+";
  public phoneregex: string = "^0(9)[0-9\d]{8}$";
  private myFormValueChanges$!: Subscription;
  public preIdentification: string = '';

  optDNI: string[] = ['Cedula', 'RUC'];

  constructor(
    private fb: FormBuilder,
    private _svcClient: ClientsService,
    private _svcValidator: ValidatorsService,
    private toast: ToastService,
    private cd: ChangeDetectorRef) {
    this.clientForm = this.createForm();
  }

  ngOnInit(): void {
    if (this.info) {
      let initData;
      if (this.info?.vehiculos) {
        initData = this.info;
      } else {
        const { vehiculos: _ignored, ...data } = this.info;
        initData = data;
      }

      this.editSetvalueForm(initData);
    }

    this.clienteOriginal = { ...this.clientForm.value };

    this.myFormValueChanges$ = this.clientForm.controls['idTipoIdentificacion'].valueChanges.subscribe(valor => this.changeValidatorsIdentification(valor));

    this.clientForm.valueChanges.subscribe(() => {
      this.verificarCambios();
    });
  }

  ngAfterViewInit() {
    this.btnText = this.info ? 'Actualizar' : 'Guardar';
    this.cd.detectChanges();
  }

  createForm(): FormGroup {
    return this.fb.group({
      cliente_id: [null],
      idTipoIdentificacion: [null, [Validators.required]],
      celular: ['', [Validators.pattern(this.phoneregex)]],
      correo: ['', [Validators.email, Validators.pattern(this.emailregex)]],
      identificacion: [{ value: null, disabled: true }, [Validators.required]],
    });
  }

  verificarCambios() {
    const cambios = JSON.stringify(this.clientForm.value) !== JSON.stringify(this.clienteOriginal);
    this.cambiosRealizados = cambios;
  }

  editSetvalueForm(data: any) {
    if (data) {
      const valueIDE = data.identificacion.length == 10 ? 'Cedula' : 'RUC';
      this.validatorEcu = data.identificacion.length == 10 ? cedulaValidation() : rucValidation();

      this.clientForm.get('idTipoIdentificacion')?.setValue(valueIDE);
      this.changeValidatorsIdentification(valueIDE);
      this.clientForm.patchValue(data);
      this.clientForm.get('identificacion')?.addValidators(this.validatorEcu);
      this.checkInvalidDNI();
    }
  }

  checkInvalidDNI() {
    if (this.identificacion?.invalid) {
      this.validIdentity.setValue(true);
      this.identificacion?.removeValidators(this.validatorEcu);
    }
  }

  onSaveClient() {
    if (this.clientForm.valid) {
      const formValue = this.clientForm.value;
      const tipo = formValue.idTipoIdentificacion == 'RUC' ? 'entidad' : 'persona';
      const data = { tipo, ...formValue };
      this.preIdentification = this.clientForm.get('identificacion')?.value;

      this.disableForm();

      if (this.info) {
        this.updateClient(this.info.cliente_id, data).subscribe(() => {
          this.enableForm();
          this.toast.openSnackBar('Usuario actualizado con éxito', 'success');
        });
      } else {
        this.saveClient(data).subscribe((resp) => {
          this.nuevoReg.emit(resp.data.id);
          this.enableForm();
          this.toast.openSnackBar('Cliente creado con éxito', 'success');
          this.onCar.emit(false);
        });
      }
    }
  }

  disableForm() {
    this.isLoading = true;
    this.clientForm.disable();
  }

  enableForm() {
    this.isLoading = false;
    this.clientForm.enable();
    this.identificacion?.setValue(this.preIdentification, { emitEvent: false }); // Establece el valor sin emitir eventos
    this.checkInvalidDNI();
  }

  saveClient(data: any) {
    return this._svcClient.saveClient(data).pipe(
      catchError((error: any) => {
        this.handleError(error);
        this.enableForm()
        return throwError(() => error);
      })
    );
  }

  updateClient(clientId: number, data: any) {
    return this._svcClient.updateClient(clientId, data).pipe(
      catchError((error: any) => {
        this.handleError(error);
        this.enableForm()
        return throwError(() => error);
      })
    );
  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 422) {
      // Error de validación
      const validationErrors = error.error.errors;
      let msgErrors: string = '';

      if (validationErrors) {
        for (const key in validationErrors) {
          if (validationErrors.hasOwnProperty(key)) {
            msgErrors += validationErrors[key].join(', ');
          }
        }
        this.toast.openSnackBar(JSON.stringify(msgErrors), 'warning');
      }
    } else if (error.status === 404) {
      // Recurso no encontrado
      this.toast.openSnackBar('El recurso no fue encontrado', 'info')
    } else if (error.status === 401) {
      // Error de validación
      const validationErrors = error.error.data;
      let msgErrors: string = '';

      if (validationErrors) {
        for (const key in validationErrors) {
          if (validationErrors.hasOwnProperty(key)) {
            msgErrors += validationErrors[key].join(', ');
          }
        }
        this.toast.openSnackBar(JSON.stringify(msgErrors), 'warning');
      }
    } else {
      // Otros errores
      console.log('Error desconocido');
    }
  }

  private changeValidatorsIdentification(valor: string) {
    this.validIdentity.setValue(null);
    let objetivoControl = this.identificacion;
    objetivoControl?.setValue(null);
    objetivoControl?.enable();
    objetivoControl?.clearValidators();
    const initValue = this.info?.identificacion ?? null;

    switch (valor) {
      case "Cedula":
        this.clientForm?.removeControl("razon_social");
        this.clientForm.addControl("nombres", new FormControl('', [Validators.required, Validators.pattern(this.letterregex), Validators.minLength(3)]));
        this.clientForm.addControl("apellidos", new FormControl('', [Validators.required, Validators.pattern(this.letterregex), Validators.minLength(3)]));
        this.minLengtIdentification = 10;
        this.validatorEcu = cedulaValidation();
        this.validatorIdentificacion = existsCedulaValidator(this._svcValidator, initValue);
        break;
      case "RUC":
        this.clientForm?.removeControl("nombres");
        this.clientForm?.removeControl("apellidos");
        this.clientForm.addControl("razon_social", new FormControl('', [Validators.required, Validators.minLength(3)]));
        this.minLengtIdentification = 13;
        this.validatorEcu = rucValidation();
        this.validatorIdentificacion = existsRucValidator(this._svcValidator, initValue);
        break;
    }

    objetivoControl?.setValidators([
      Validators.required,
      Validators.minLength(this.minLengtIdentification),
      Validators.pattern("^[0-9]*$"),
      this.validatorEcu
    ]);

    objetivoControl?.setAsyncValidators(this.validatorIdentificacion);

    objetivoControl?.markAsDirty()
    objetivoControl?.updateValueAndValidity();
  }

  get identificacion() {
    return this.clientForm.get('identificacion');
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
            : this.checkErrorForm('identificacion', 'cedulaExists')
              ? 'La cedula está en uso'
              : this.checkErrorForm('identificacion', 'rucExists')
                ? 'El RUC está en uso'
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
