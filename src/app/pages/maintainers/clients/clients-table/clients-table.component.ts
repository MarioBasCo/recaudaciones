import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Client } from '../client.interface';
import { MatTableDataSource } from '@angular/material/table';
import { ClientsService } from '../clients.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-clients-table',
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ClientsTableComponent {
  displayedColumns: string[] = [
    'nombre',
    'identificacion',
    'vehiculos',
    'actions'
  ];
  columns = [
    {
      columnDef: 'nombre',
      header: 'Nombre/Razón Social',
      cell: (element: Client) => `${element.razon_social ?? element.nombres + ' ' + element.apellidos}`,
    },
    {
      columnDef: 'identificacion',
      header: 'Identificación',
      cell: (element: Client) => `${element.identificacion}`,
    },
    {
      columnDef: 'vehiculos',
      header: '# Vehiculos',
      cell: (element: Client) => `${element?.vehiculos?.length ?? 0}`,
    },
  ];
  dataSource!: MatTableDataSource<any>;
  filteredData!: any[];

  @Output() editElement = new EventEmitter<any>();
  @Output() deleteElement = new EventEmitter<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  expandedElement!: Client;

  private clients$!: Subscription;

  constructor(private _svcClient: ClientsService) { }

  ngOnInit() {
    this.clients$ = this._svcClient.listaCliente$.subscribe(resp => {
      this.dataSource = new MatTableDataSource(resp);
      this.filteredData = resp;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  openEditForm(client: any) {
    this.editElement.emit(client);
  }

  deleteClient(data: any) {
    this.deleteElement.emit(data);
  }

  ngOnDestroy() {
    this.clients$.unsubscribe();
  }
}
