import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [ 'cedula', 'nombres', 'apellidos', 'usuario', 'rol', 'actions'];
  columns = [
    {
      columnDef: 'cedula',
      header: 'Identificación',
      cell: (element: any) => `${element.identificacion}`,
    },
    {
      columnDef: 'nombres',
      header: 'Nombres',
      cell: (element: any) => `${element.nombres}`,
    },
    {
      columnDef: 'apellidos',
      header: 'Apellidos',
      cell: (element: any) => `${element.apellidos}`,
    },
    {
      columnDef: 'usuario',
      header: 'Usuario',
      cell: (element: any) => `${element.usuario}`,
    },
    {
      columnDef: 'rol',
      header: 'Rol',
      cell: (element: any) => `${element.rol}`,
    },
  ];

  dataSource: MatTableDataSource<any> = new MatTableDataSource([
    { 
      identificacion: '0928381839',
      nombres: 'Mario',
      apellidos: 'Basilio',
      usuario: 'mbasilio',
      rol: 'Administrador'
    },
  ]);
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openEditForm(client: any) {
    //this.editElement.emit(client);
  }

  deleteUser(data: any) {
    //this.deleteElement.emit(data);
  }
}
