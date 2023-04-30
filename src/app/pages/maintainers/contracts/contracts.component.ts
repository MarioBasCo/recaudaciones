import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormContractComponent } from './form-contract/form-contract.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss']
})
export class ContractsComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'name',
    'class',
    'section',
    'subjects',
    'marks',
    'actions'
  ];
  columns = [
    {
      columnDef: 'name',
      header: 'Trabajador',
      cell: (element: any) => `${element.name}`,
    },
    {
      columnDef: 'class',
      header: 'Meses Contrato',
      cell: (element: any) => `${element.class}`,
    },
    {
      columnDef: 'section',
      header: 'Fecha Inicio',
      cell: (element: any) => `${element.section}`,
    },
    {
      columnDef: 'subjects',
      header: 'Fecha Fin',
      cell: (element: any) => `${element.subjects.join(', ')}`,
    },
    {
      columnDef: 'marks',
      header: 'Estado',
      cell: (element: any) => `${element.marks.join(', ')}`,
    },
  ];
  dataSource!: MatTableDataSource<any>;

  constructor(public dialog: MatDialog){

  }

  openDialog(data: any = null) {
    const dialogRef = this.dialog.open(FormContractComponent, {
      data: data,
      width: '550px',
      minWidth: 'auto'
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {

      }
    });
  }


  deleteElement(row: any){

  }
}
