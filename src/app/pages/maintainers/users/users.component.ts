import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserFormComponent } from './user-form/user-form.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from './user.service';
import { UsersTableComponent } from './users-table/users-table.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  public isLoading: boolean = false;
  @ViewChild(UsersTableComponent) tablaComponent!: UsersTableComponent;
  
  constructor(
    public dialog: MatDialog, 
    private _svcUser: UserService) {

  }

  ngOnInit(){
    this.loadData();    
  }

  loadData(){
    this.isLoading = true;
    this._svcUser.getUsers().subscribe(resp => {
      this.isLoading = false;
      this._svcUser.sharedList(resp);
    });
  }

  openDialogUser(user: any = null) {
    const dialogRef = this.dialog.open(UserFormComponent, {
      data: user,
      width: '640px',
      minWidth: 'auto'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {

      }
    });
  }

  refreshData(){
    this.loadData();
  }

  applyFilter(filterValue: string){
    this.tablaComponent.applyFilter(filterValue);
  }

  deleteUser(event: any){

  }
}
