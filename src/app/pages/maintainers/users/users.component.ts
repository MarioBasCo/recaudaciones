import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  displayedColumns:string[] =  ['id', 'actions'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource([
    {id: 123},
    {id: 234}
  ]);

  openDialogUser(){

  }
}
