import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserFormComponent } from './user-form/user-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
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

  constructor(public dialog: MatDialog) {

  }

  openDialogUser(user: any = null) {
    const dialogRef = this.dialog.open(UserFormComponent, {
      data: user,
      width: '450px',
      minWidth: 'auto'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {

      }
    });
  }

  refreshData(){

  }

  applyFilter(filterValue: string){
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  deleteUser(event: any){

  }
}
