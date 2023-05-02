import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ToastService } from 'src/app/shared/services/toast.service';
import { cedulaValidation } from 'src/app/shared/utils/cedula-validator';
import { rucValidation } from 'src/app/shared/utils/ruc-validator';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit, OnDestroy {
  public title: string = '';
  public clientForm: FormGroup;
  public isLoading: boolean = false;
  public isEdit: boolean = false;
  public minLengtIdentification: number = 0;
  public validatorEcu!: ValidatorFn;
  public validIdentity: FormControl = new FormControl(null);
  public pat_placa: string = "^([A-Z]{3}-\d{3,4})$";
  public emailregex: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  public letterregex: string = "[A-Za-zÁÉÍÓÚáéíóúñÑ ]+";
  public phoneregex: string = "^0(9)[0-9\d]{8}$";
  private myFormValueChanges$!: Subscription;

  public customPatterns = { 'S': { pattern: new RegExp('\[a-zA-Z\]') }, '0': { pattern: new RegExp('^[0-9]*$') } };
  frameworks: string[] = ['Furgón', 'Camioneta', 'Camión'];
  optDNI: string[] = ['Cedula', 'RUC'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ClientFormComponent>,
    public fb: FormBuilder,
    private toast: ToastService
  ) {
    this.clientForm = this.createForm(data);
    this.title = this.data ? 'Editar' : 'Nuevo';
  }

  ngOnInit() {
    this.myFormValueChanges$ = this.clientForm.controls['idTipoIdentificacion'].valueChanges.subscribe(valor => this.changeValidatorsIdentification(valor));
  }

  private changeValidatorsIdentification(valor: string) {
    this.validIdentity.setValue(null);
    //Obtenemos el control ya instanciado en el formulario. 
    let objetivoControl = this.identificacion;
    objetivoControl?.setValue(null);
    objetivoControl?.enable();
    //Quitamos todas las validaciones del control.
    objetivoControl?.clearValidators();

    //Agregamos la validacion segun el caso:
    switch (valor) {
      case "Cedula":
        //Se agregan de nuevo todas las validaciones que necesites. 
        this.clientForm?.removeControl("razon");
        this.clientForm.addControl("nombres", new FormControl('', [Validators.required, Validators.pattern(this.letterregex), Validators.minLength(3)]));
        this.clientForm.addControl("apellidos", new FormControl('', [Validators.required, Validators.pattern(this.letterregex), Validators.minLength(3)]));
        this.minLengtIdentification = 10;
        this.validatorEcu = cedulaValidation();
        break;
      case "RUC":
        this.clientForm?.removeControl("nombres");
        this.clientForm?.removeControl("apellidos");
        this.clientForm.addControl("razon", new FormControl('', [Validators.required, Validators.minLength(3)]));
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

    //Para evitar problemas con la validacion marcamos el campo con 
    // dirty, de esta manera se ejecutan de nuevo las validaciones
    objetivoControl?.markAsDirty()
    //Recalculamos el estado del campo para que cambie el estado 
    // del formulario. 
    objetivoControl?.updateValueAndValidity();
  }

  createForm(client: any): FormGroup {
    return this.fb.group({
      id: [null],
      idTipoIdentificacion: [null, [Validators.required]],
      celular: [null, [Validators.pattern(this.phoneregex)]],
      correo: [null, [Validators.email, Validators.pattern(this.emailregex)]],
      identificacion: [{ value: client ? client.identificacion : null, disabled: true }, [Validators.required]],
      cars: this.fb.array([this.initFormCar()], [Validators.required]),
    });
  }

  initFormCar(): FormGroup {
    return new FormGroup({
      id: new FormControl(null),
      idTipoVehiculo: new FormControl('', [Validators.required]),
      placa: new FormControl('', [Validators.required])
    });
  }

  get identificacion() {
    return this.clientForm.get('identificacion');
  }

  getCtrl(key: string, form: FormGroup): any {
    return form.get(key);
  }

  addCar() {
    const cars = this.clientForm.get('cars') as FormArray;
    cars.push(this.initFormCar());
  }

  removeCar(i: number) {
    const cars = this.clientForm.get('cars') as FormArray;
    cars.removeAt(i);
  }

  crearNueva(i: number) {
    const cars = this.clientForm.get('cars') as FormArray;
    const refSingle = cars.at(i) as FormGroup;
    refSingle.disable();
  }

  habilitarEdicion(i: number) {
    const cars = this.clientForm.get('cars') as FormArray;
    cars.at(i).enable();
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
    return this.checkErrorForm('razon', 'required')
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
