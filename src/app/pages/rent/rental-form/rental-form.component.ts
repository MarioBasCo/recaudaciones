import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-rental-form',
  templateUrl: './rental-form.component.html',
  styleUrls: ['./rental-form.component.scss']
})
export class RentalFormComponent {
  rentalForm: FormGroup;
  isDataLoaded = true; // Variable para controlar la visibilidad de los campos de datos personales
  locations: string[] = ['Local 1', 'Local 2', 'Local 3']; // Lista de locales disponibles

  constructor(private formBuilder: FormBuilder) {
    this.rentalForm = this.formBuilder.group({
      identification: ['', Validators.required],
      firstName: [''],
      lastName: [''],
      email: [''],
      address: [''],
      phone: [''],
      location: ['', Validators.required],
      rentValue: ['', Validators.required],
      rentMonths: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  loadData(): void {
    // Aquí puedes implementar la lógica para cargar los datos de una persona desde la base de datos.
    // Por simplicidad, solo cambiaremos el estado de la variable isDataLoaded en este ejemplo.
    this.isDataLoaded = false;
  }

  save(): void {
    if (this.rentalForm.valid) {
      // Aquí puedes implementar la lógica para guardar los datos del formulario.
      console.log(this.rentalForm.value);
    } else {
      // Manejo de errores o validaciones adicionales
    }
  }
}
