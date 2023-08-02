import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { TipoVehiculo } from '../../../clients/client.interface';
import { MatTableDataSource } from '@angular/material/table';
import { VehicleTypesService } from '../vehicle-types.service';
import { number } from 'echarts';

@Component({
  selector: 'table-types-vehicle',
  templateUrl: './table-types-vehicle.component.html',
  styleUrls: ['./table-types-vehicle.component.scss']
})
export class TableTypesVehicleComponent implements OnInit {
  displayedColumns: string[] = ['detalle', 'valor', 'actions'];
  columns = [
    {
      columnDef: 'detalle',
      header: 'Detalle',
      cell: (element: TipoVehiculo) => `${element.detalle}`,
    },
    {
      columnDef: 'valor',
      header: 'Valor',
      cell: (element: TipoVehiculo) => `$ ${parseFloat(element.valor).toFixed(2)}`,
    },
  ];

  dataSource!: MatTableDataSource<TipoVehiculo>;
  private users$!: Subscription;

  @Output() editElement = new EventEmitter<any>();
  @Output() deleteElement = new EventEmitter<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _svcVehicleType: VehicleTypesService) { }

  ngOnInit() {
    this.users$ = this._svcVehicleType.listTypes$.subscribe(resp => {
      //console.log(resp);
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openEditForm(client: any) {
    this.editElement.emit(client);
  }

  deleteRegister(data: any) {
    this.deleteElement.emit(data);
  }

  ngOnDestroy() {
    this.users$.unsubscribe();
  }
}
