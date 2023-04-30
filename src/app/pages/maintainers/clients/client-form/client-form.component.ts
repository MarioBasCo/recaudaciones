import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit {
  public title: string = '';
  public clientForm: FormGroup;
  public isLoading: boolean = false;
  public isEdit: boolean = false;
  public minLengtIdentification: number = 0;
  public pat_placa: string = "^([A-Z]{3}-\d{3,4})$";
  public emailregex: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  public letterregex: string = "[A-Za-zÁÉÍÓÚáéíóúñÑ ]+";
  public phoneregex: string = "^0(9)[0-9\d]{8}$";

  public customPatterns = { 'U': { pattern: new RegExp('^[A-Z]*$')}, '0': { pattern: new RegExp('^[0-9]*$')} };
  frameworks: string[] = ['Furgón', 'Camioneta', 'Camión'];
  optDNI: string[] = ['Cedula', 'RUC'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ClientFormComponent>,
    public fb: FormBuilder
  ) {
    this.clientForm = this.createForm(data);
    this.title = this.data ? 'Editar' : 'Nuevo';
  }

  ngOnInit() {
    this.clientForm?.get("idTipoIdentificacion")?.valueChanges.subscribe(valor => {
      //Obtenemos el control ya instanciado en el formulario. 
      let objetivoControl = this.clientForm.get("identificacion");
      objetivoControl?.enable();
      //Quitamos todas las validaciones del control.
      objetivoControl?.clearValidators();

      //Agregamos la validacion segun el caso:
      switch (valor) {
        case "Cedula":
          //Se agregan de nuevo todas las validaciones que necesites. 
          this.clientForm?.removeControl("razon");
          this.clientForm.addControl("nombres", new FormControl('', [Validators.required, Validators.pattern(this.letterregex)]));
          this.clientForm.addControl("apellidos", new FormControl('', [Validators.required, Validators.pattern(this.letterregex)]));
          this.minLengtIdentification = 10;
          objetivoControl?.setValidators([
            Validators.required,
            Validators.minLength(10),
            Validators.pattern("^[0-9]*$")
          ]);
          break;
        case "RUC":
          this.clientForm?.removeControl("nombres");
          this.clientForm?.removeControl("apellidos");
          this.clientForm.addControl("razon", new FormControl('', [Validators.required]));
          this.minLengtIdentification = 13;
          objetivoControl?.setValidators([
            Validators.required,
            Validators.minLength(13),
            Validators.pattern("^[0-9]*$")
          ]);
          break;
      }

      //Para evitar problemas con la validacion marcamos el campo con 
      // dirty, de esta manera se ejecutan de nuevo las validaciones
      objetivoControl?.markAsDirty()
      //Recalculamos el estado del campo para que cambie el estado 
      // del formulario. 
      objetivoControl?.updateValueAndValidity()
    });
  }

  createForm(client: any): FormGroup {
    return this.fb.group({
      id: [client ? client.id : null],
      idTipoIdentificacion: [null, [Validators.required]],
      celular: [client ? client.celular : null, [Validators.pattern(this.phoneregex)]],
      correo: [client ? client.correo : null, [Validators.email, Validators.pattern(this.emailregex)]],
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

  save() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }


  getErrorTipoIdentificacion() {
    return this.clientForm?.get('idTipoIdentificacion')?.hasError('required')
      ? 'El campo tipo de identificación es requerido'
      : '';
  }


  getErrorIdentificacion() {
    return this.clientForm?.get('identificacion')?.hasError('required')
      ? 'El campo identificación es requerido'
      : this.clientForm?.get('identificacion')?.hasError('pattern')
      ? 'El campo debe ser númerico'
      : this.clientForm?.get('identificacion')?.hasError('minlength')
      ? `El campo debe contener ${this.minLengtIdentification} de digitos`
      : '';
  }

  getErrorNombres() {
    return this.clientForm?.get('nombres')?.hasError('required')
      ? 'El campo nombres es requerido'
      : this.clientForm?.get('nombres')?.hasError('pattern')
      ? 'El campo debe contener solo letras'
      : '';
  }

  getErrorApellidos() {
    return this.clientForm?.get('apellidos')?.hasError('required')
      ? 'El campo apellidos es requerido'
      : this.clientForm?.get('apellidos')?.hasError('pattern')
      ? 'El campo debe contener solo letras'
      : '';
  }

  getErrorRazon() {
    return this.clientForm?.get('razon')?.hasError('required')
    ? 'El campo Razón Social es requerido'
    : '';
  }

  getErrorCorreo() {
    return this.clientForm?.get('correo')?.hasError('email') || this.clientForm?.get('correo')?.hasError('pattern')
      ? 'El campo correo debe tener un formato válido'
      : '';
  }

  getErrorCelular() {
    return this.clientForm?.get('celular')?.hasError('pattern')
      ? 'El campo celular empezar con 09... y tener 10 digitos'
      : '';
  }
}
