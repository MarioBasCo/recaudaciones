import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { TurnsService } from '../turns.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/shared/services/toast.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { OptionsAlert } from 'src/app/components/alert-dialog/alert-dialog.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-ticket-turns',
  templateUrl: './ticket-turns.component.html',
  styleUrls: ['./ticket-turns.component.scss']
})
export class TicketTurnsComponent {
  public plaque: FormControl;
  public readForm: FormGroup;
  public aperturado: boolean = false;
  public existsInfo: boolean = false;
  public turnoActual: number = 0;
  public ticketNumber: string = '';
  public currentDate: string | null = '';
  public title: string = '';

  @ViewChild('printTemplate', { static: false }) printTemplate!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private _svcTurn: TurnsService,
    private toast: ToastService,
    private storage: StorageService,
    private alert: AlertService,
    private datePipe: DatePipe,
    private cd: ChangeDetectorRef,
  ) {
    this.plaque = new FormControl('');
    this.readForm = this.fb.group({
      idUsuario: [null],
      nombre: [null, [Validators.required]],
      idVehiculo: [null],
      idTipoVehiculo: [null],
      turno_id: [null],
      tipo: [null, [Validators.required]],
      valor: [null, [Validators.required]],
    });
    this.readForm.disable();
  }

  ngOnInit() {
    this.plaque.valueChanges.subscribe(x => {
      if (x === '' || x === null)
        this.readForm.reset();
      this.existsInfo = false;
    });

    this.getTurnoActual();
    if (this.turnoActual) {
      this.aperturado = true;
    }
  }

  get plaqueField() {
    return this.plaque.getRawValue();
  }

  get nombre() {
    return this.readForm.get('nombre')?.value;
  }

  get tipo() {
    return this.readForm.get('tipo')?.value;
  }

  get valor() {
    return this.readForm.get('valor')?.value;
  }

  getTurnoActual() {
    this.turnoActual = this.storage.get('turn_pto');
    const user = this.storage.get('user_pto');
    const data = { user_id: user?.id };
    this._svcTurn.turnoAbierto(data).subscribe(
      {
        next: (resp) => {
          if (resp.turno) {
            this.turnoActual = resp.turno.id;
            this.storage.set('turn_pto', resp.turno.id);
          }
        },
        error: (err) => {
          this.aperturado = false;
        }
      }
    );
  }

  fechaImpresion() {
    const date = new Date();
    return this.datePipe.transform(date, 'MMM d, yyyy, h:mm:ss a', 'GMT-5', 'en-US');
  }

  empezarTurno() {
    const dialogAlert = this.aperturaAlert();
    dialogAlert.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        const user = this.storage.get('user_pto');
        const data = { user_id: user?.id };
        this._svcTurn.aperturar(data).subscribe(resp => {
          if (resp.turno) {
            this.aperturado = true;
            this.storage.set('turn_pto', resp.turno.id);
            this.toast.openSnackBar(resp.message, 'info');
          }
        });
      }
    });
  }

  aperturaAlert() {
    const opt: OptionsAlert = {
      title: '🔔 Apertura de Turno 🔔',
      message: '¿Deseas aperturar un turno?'
    };
    return this.alert.open(opt);
  }

  buscarDatos() {
    this.readForm.reset();
    this.existsInfo = false;
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

          this.existsInfo = true;
          this.readForm.patchValue(data);
        },
        error: (err) => {
          this.toast.openSnackBar(err.error.error, 'info')
        }
      });
  }

  clearPlaqueField() {
    this.plaque.setValue('');
    this.existsInfo = false;
  }

  saveCobro() {
    const user = this.storage.get('user_pto');
    this.readForm.get('idUsuario')?.setValue(user?.id);
    const turn_pto = this.storage.get('turn_pto');
    this.readForm.get('turno_id')?.setValue(turn_pto);
    const data = this.readForm.value;
    this._svcTurn.guardarCobro(data).subscribe(resp => {
      if (resp.cobro) {
        this.currentDate = this.fechaImpresion();
        this.ticketNumber = resp.cobro.ticket_number;
        this.title = `ticket_${Date.now()}`;
        this.cd.detectChanges();
        this.toast.openSnackBar(resp.message);
        this.printPDF();
        this.clearPlaqueField();
      }
    });
  }

  printPDF() {
    if (this.printTemplate) {
      this.printTemplate.nativeElement?.click();
    }
  }
}
