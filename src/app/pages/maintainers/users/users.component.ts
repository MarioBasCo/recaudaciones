import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserFormComponent } from './user-form/user-form.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from './user.service';
import { UsersTableComponent } from './users-table/users-table.component';
import { OptionsAlert } from 'src/app/components/alert-dialog/alert-dialog.component';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ToastService } from 'src/app/shared/services/toast.service';

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
    private _svcUser: UserService,
    private toast: ToastService,
    private alert: AlertService) {

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
        this.loadData();
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
    const opt: OptionsAlert = {
      title: '❌ Eliminar Registro',
      message: '¿Deseas eliminar este registro?'
    };
    const dialogAlert = this.alert.open(opt);

    dialogAlert.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        let id = event.id;
        this._svcUser.eliminarUser(id).subscribe(resp => {
          if(resp.message){
            this.toast.openSnackBar(resp.message);
            this.loadData();
          }
        });
      }
    });
  }
}
