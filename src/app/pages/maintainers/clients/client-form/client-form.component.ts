import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Client } from '../client.interface';
import { ClientsService } from '../clients.service';
import { AlertService } from 'src/app/shared/services/alert.service';


@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit {
  public title: string = '';
  disabledCard = true;
  clientForm!: FormGroup;
  selectedTabIndex = 0;
  idNewRegistro: number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Client,
    public dialogRef: MatDialogRef<ClientFormComponent>,
    public fb: FormBuilder,
    private toast: ToastService,
    private _svcClient: ClientsService,
    private alert: AlertService,
  ) {
    this.title = this.data ? 'Actualización de Datos' : 'Nuevo Registro';
    this.disabledCard = !(!!this.data);
  }

  ngOnInit() {

  }

  changeStatus(value: boolean){
    this.disabledCard = value;
  }

  reemitirId(value: number){
    this.idNewRegistro = value;
  }

}
