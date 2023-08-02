import { Component, ViewChild } from '@angular/core';
import { ClientFormComponent } from './client-form/client-form.component';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert.service';
import { OptionsAlert } from 'src/app/components/alert-dialog/alert-dialog.component';
import { ClientsService } from 'src/app/pages/maintainers/clients/clients.service';
import { Client } from './client.interface';
import { ClientsTableComponent } from './clients-table/clients-table.component';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent {
  public isLoading: boolean = false;
  @ViewChild(ClientsTableComponent) tablaComponent!: ClientsTableComponent;

  constructor(
    public dialog: MatDialog, private alert: AlertService,
    private _svcClient: ClientsService,
    private toast: ToastService) { 
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;

    this._svcClient.getClients().subscribe(resp => {
      this.isLoading = false;
      this._svcClient.sharedList(resp);
    });
  }

  openDialogClient(client: Client | null = null) {
    const dialogRef = this.dialog.open(ClientFormComponent, {
      data: client,
      width: '640px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
      }
    });
  }

  refreshData() {
    this.loadData();
  }

  applyFilter(filterValue: string) {
    this.tablaComponent.applyFilter(filterValue);
  }

  deleteClient(data: any) {
    const opt: OptionsAlert = {
      title: '❌ Eliminar Registro',
      message: '¿Deseas eliminar este registro?'
    };
    const dialogAlert = this.alert.open(opt);

    dialogAlert.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        let id = data.cliente_id;
        this._svcClient.eliminarCliente(id).subscribe(resp => {
          if(resp.message){
            this.loadData();
            this.toast.openSnackBar(resp.message);            
          }
        });
      }
    });
  }
}
