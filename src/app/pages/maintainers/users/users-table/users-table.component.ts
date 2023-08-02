import { Component, Input, ViewChild, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IUser } from '../user.interface';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent {
  displayedColumns: string[] = ['cedula', 'nombres', 'apellidos', 'usuario', 'rol', 'actions'];
  columns = [
    {
      columnDef: 'cedula',
      header: 'Identificación',
      cell: (element: IUser) => `${element.identificacion}`,
    },
    {
      columnDef: 'nombres',
      header: 'Nombres',
      cell: (element: IUser) => `${element.nombres}`,
    },
    {
      columnDef: 'apellidos',
      header: 'Apellidos',
      cell: (element: IUser) => `${element.apellidos}`,
    },
    {
      columnDef: 'usuario',
      header: 'Usuario',
      cell: (element: IUser) => `${element.username}`,
    },
    {
      columnDef: 'rol',
      header: 'Rol',
      cell: (element: IUser) => `${element.name_role}`,
    },
  ];

  dataSource!: MatTableDataSource<IUser>;
  private users$!: Subscription;

  @Output() editElement = new EventEmitter<any>();
  @Output() deleteElement = new EventEmitter<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _svcUser: UserService) { }

  ngOnInit() {
    this.users$ = this._svcUser.listUser$.subscribe(resp => {
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  openEditForm(client: any) {
    this.editElement.emit(client);
  }

  deleteUser(data: any) {
    this.deleteElement.emit(data);
  }

  ngOnDestroy() {
    this.users$.unsubscribe();
  }
}
