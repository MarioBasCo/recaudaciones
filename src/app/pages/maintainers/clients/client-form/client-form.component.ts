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
  frameworks: string[] = ['Angular', 'Reactjs', 'Vue'];
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
          this.clientForm.addControl("nombres", new FormControl('', [Validators.required]));
          this.clientForm.addControl("apellidos", new FormControl('', [Validators.required]));
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
      idTipoIdentificacion: [5],
      celular: [client ? client.celular : null],
      correo: [client ? client.correo : null],
      identificacion: [{ value: client ? client.identificacion : null, disabled: true }],
      cars: this.fb.array([]),
    });
  }

  initFormCar(): FormGroup {
    return new FormGroup({
      id: new FormControl(null),
      idTipoVehiculo: new FormControl(''),
      placa: new FormControl('')
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
}
