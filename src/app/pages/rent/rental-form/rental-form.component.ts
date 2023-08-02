import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RentService } from '../rent.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-rental-form',
  templateUrl: './rental-form.component.html',
  styleUrls: ['./rental-form.component.scss']
})
export class RentalFormComponent {
  public emailregex: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  public letterregex: string = "[A-Za-zÁÉÍÓÚáéíóúñÑ ]+";
  public phoneregex: string = "^0(9)[0-9\d]{8}$";
  rentalForm: FormGroup;
  isDataLoaded = true; // Variable para controlar la visibilidad de los campos de datos personales
  locations: any[] = []; // Lista de locales disponibles
  

  constructor(
    public dialogRef: MatDialogRef<RentalFormComponent>,
    private formBuilder: FormBuilder, private _svcRent: RentService) {
    this.rentalForm = this.formBuilder.group({
      persona_id: [null],
      identificacion: ['', Validators.required],
      nombres: ['', [Validators.required, Validators.pattern(this.letterregex)]],
      apellidos: ['', [Validators.required, Validators.pattern(this.letterregex)]],
      correo: ['', [Validators.required, Validators.email]],
      direccion: [''],
      celular: [''],
      local_id: [null, Validators.required],
      valorArriendo: [0, [Validators.required, Validators.min(0.01)]],
      fecha: [null, Validators.required],
      meses: [0, [Validators.required, Validators.min(3)]]
    });
  }

  ngOnInit(): void {
    this._svcRent.getLocales().subscribe(resp => {
      this.locations = resp;
    });
  }

  get identificacion() {
    return this.rentalForm.get('identificacion');
  }

  get nombres() {
    return this.rentalForm.get('nombres');
  }

  get apellidos() {
    return this.rentalForm.get('apellidos');
  }

  get correo() {
    return this.rentalForm.get('correo');
  }

  get celular() {
    return this.rentalForm.get('celular');
  }


  get direccion() {
    return this.rentalForm.get('direccion');
  }

  get persona_id() {
    return this.rentalForm.get('persona_id');
  }

  loadData(): void {
    // Aquí puedes implementar la lógica para cargar los datos de una persona desde la base de datos.
    // Por simplicidad, solo cambiaremos el estado de la variable isDataLoaded en este ejemplo.
    const ced = this.rentalForm.get('identificacion')?.value;
    this._svcRent.buscarPersona(ced).subscribe(resp => {
      if (resp) {
        this.isDataLoaded = false;
        this.persona_id?.setValue(resp.id);
        this.nombres?.setValue(resp.nombres);
        this.apellidos?.setValue(resp.apellidos);
        this.direccion?.setValue(resp.direccion);
        this.correo?.setValue(resp.correo);
        this.celular?.setValue(resp.celular);
      }
    })
  }

  save(): void {
    if (this.rentalForm.valid) {
      // Aquí puedes implementar la lógica para guardar los datos del formulario.
      console.log(this.rentalForm.value);
      const { fecha, ...info } = this.rentalForm.value;
      const data = {
        fecha: new Date(fecha).toISOString().slice(0, 10),
        ...info
      }
      this._svcRent.guardarArriendo(data).subscribe({
        next: (resp) => {
          console.log(resp);
        },
        error: () => {

        }
      })
    } else {
      // Manejo de errores o validaciones adicionales
    }
  }
}
