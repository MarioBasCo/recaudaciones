import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RentService } from '../rent.service';
import { Arriendo } from '../rent.interface';
import { MatDialog } from '@angular/material/dialog';
import { RentalFormComponent } from '../rental-form/rental-form.component';

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
    private _svcRent: RentService) { }

  ngOnInit() {
    this._svcRent.getArriendos().subscribe(resp => {
      console.log(resp);
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
      }
    });
  }

  openEditForm(client: any) {
    //this.editElement.emit(client);
  }

  deleteUser(data: any) {
    //this.deleteElement.emit(data);
  }
}
