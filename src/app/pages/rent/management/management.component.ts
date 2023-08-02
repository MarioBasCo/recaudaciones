import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RentService } from '../rent.service';
import { Arriendo } from '../rent.interface';
import { MatDialog } from '@angular/material/dialog';
import { RentalFormComponent } from '../rental-form/rental-form.component';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { OptionsAlert } from 'src/app/components/alert-dialog/alert-dialog.component';

@Component({
  selector: 'management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  displayedColumns: string[] = ['arrendatario', 'codigo', 'valorArriendo', 'meses', 'fecha', 'actions'];
  columns = [
    {
      columnDef: 'arrendatario',
      header: 'Arrendatario',
      cell: (element: Arriendo) => `${element.arrendatario}`,
    },
    {
      columnDef: 'codigo',
      header: 'Local',
      cell: (element: Arriendo) => `${element.codigo}`,
    },
    {
      columnDef: 'valorArriendo',
      header: 'Valor de Arriendo',
      cell: (element: Arriendo) => `$ ${parseFloat(element.valorArriendo).toFixed(2)}`,
    },
    {
      columnDef: 'meses',
      header: 'Meses',
      cell: (element: Arriendo) => `${element.meses}`,
    },
    {
      columnDef: 'fecha',
      header: 'Fecha',
      cell: (element: Arriendo) => `${element.fecha}`,
    },
  ];

  dataSource!: MatTableDataSource<any>;

  constructor(
    public dialog: MatDialog,
    private _svcRent: RentService,
    private alert: AlertService, 
    private toast: ToastService) { }

  ngOnInit() {
    this.loadArriendos();
  }

  loadArriendos() {
    this._svcRent.getArriendos().subscribe(resp => {
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openDialogRent(data: any | null = null) {
    const dialogRef = this.dialog.open(RentalFormComponent, {
      data,
      width: '640px',
      maxHeight: '450px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.loadArriendos();
      }
    });
  }

  openEditForm(client: any) {
  }

  deleteArriendo(data: any) {
    const opt: OptionsAlert = {
      title: '❌ Eliminar Registro',
      message: '¿Deseas eliminar este registro?',
      note: '!!El Local quedará disponible!!'
    };
    const dialogAlert = this.alert.open(opt);

    dialogAlert.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        let id = data.id;
        this._svcRent.eliminarArriendo(id).subscribe({
          next: (resp: any) => {
            this.toast.openSnackBar(resp.message);
            this.loadArriendos();
          },
          error: (error) => {
            console.log(error);
          }
        });
      }
    });
  }
}
