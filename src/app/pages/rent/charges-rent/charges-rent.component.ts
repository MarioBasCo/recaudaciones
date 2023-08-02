import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RentService } from '../rent.service';
import { MatDialog } from '@angular/material/dialog';
import { PaymentFormComponent } from '../payment-form/payment-form.component';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { OptionsAlert } from 'src/app/components/alert-dialog/alert-dialog.component';

@Component({
  selector: 'charges-rent',
  templateUrl: './charges-rent.component.html',
  styleUrls: ['./charges-rent.component.scss']
})
export class ChargesRentComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['arrendatario', 'local', 'valorArriendo', 'porcentaje', 'sumaAbonos', 'ultimoPago', 'actions'];
  columns = [
    {
      columnDef: 'arrendatario',
      header: 'Arrendatario',
      cell: (element: any) => `${element.arrendatario}`,
    },
    {
      columnDef: 'local',
      header: 'Local',
      cell: (element: any) => `${element.local}`,
    },
    {
      columnDef: 'valorArriendo',
      header: 'Cuota Arriendo',
      cell: (element: any) => `$ ${parseFloat(element.valorArriendo)}`,
    },
    {
      columnDef: 'porcentaje',
      header: '%',
      cell: (element: any) => `% ${parseFloat(element.porcentaje).toFixed(2)}`,
    },
    {
      columnDef: 'sumaAbonos',
      header: 'Abono',
      cell: (element: any) => `$ ${parseFloat(element.sumaAbonos)}`,
    },
    {
      columnDef: 'ultimoPago',
      header: 'Último Pago',
      cell: (element: any) => `${element.ultimoPago || ''}`,
    },
  ];

  dataSource!: MatTableDataSource<any>;

  constructor(
    private _svcRent: RentService,
    public dialog: MatDialog,
    private alert: AlertService,
    private toast: ToastService) {

  }

  ngOnInit() {
    this.listarPagos();
  }

  listarPagos() {
    this._svcRent.getMensualidades().subscribe(resp => {
      this.dataSource = new MatTableDataSource(resp);
    });
  }

  openDialogPago() {
    const dialogRef = this.dialog.open(PaymentFormComponent, {
      width: '520px',
      maxHeight: '450px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.listarPagos();
      }
    });
  }

  notificar(item: any) {
    const opt: OptionsAlert = {
      title: '📧 Notificar Pago 📧',
      message: '¿Deseas enviar una notificación de pago?',
      note: `Se enviará un correo a ${item.correo}`
    };
    const dialogAlert = this.alert.open(opt);

    dialogAlert.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        const data =  { email: item.correo };
        this._svcRent.enviarNotificacion(data).subscribe(resp => {
          if(resp.message){
            this.toast.openSnackBar(resp.message);
          }
        });
      }
    });
  }
}
