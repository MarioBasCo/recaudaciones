import { Component } from '@angular/core';
import { TurnsService } from '../turns.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-ticket-turns',
  templateUrl: './ticket-turns.component.html',
  styleUrls: ['./ticket-turns.component.scss']
})
export class TicketTurnsComponent {
  public plaque: FormControl;
  public readForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _svcTurn: TurnsService,
    private toast: ToastService,
  ) {
    this.plaque = new FormControl('');
    this.readForm = this.fb.group({
      idUsuario: [null],
      nombre: [null, [Validators.required]],
      idVehiculo: [null],
      idTipoVehiculo: [null],
      tipo: [null, [Validators.required]],
      valor: [null, [Validators.required]],
    });
    this.readForm.disable();
  }

  ngOnInit() {
    this.plaque.valueChanges.subscribe(x => {
      if (x === '' || x === null)
        this.readForm.reset();
    });
  }

  get plaqueField() {
    return this.plaque.getRawValue();
  }

  empezarTurno() {

  }

  buscarDatos() {
    if (this.plaqueField)

      this._svcTurn.consultaPlaca(this.plaqueField).subscribe({
        next: (resp) => {
          const vehiculo = resp.vehiculo;
          const cliente = vehiculo.cliente.modelo;
          let labelnombre = cliente.razon_social ?? `${cliente.nombres} ${cliente.apellidos}`;
          const data = {
            idVehiculo: vehiculo.id,
            nombre: labelnombre,
            idTipoVehiculo: vehiculo.tipo_vehiculo.id,
            tipo: vehiculo.tipo_vehiculo.detalle,
            valor: parseFloat(vehiculo.tipo_vehiculo.valor),
          };

          this.readForm.patchValue(data);
        },
        error: (err) => {
          //console.log(err)
          this.toast.openSnackBar(err.error.error, 'info')
        }
      });
  }
}
