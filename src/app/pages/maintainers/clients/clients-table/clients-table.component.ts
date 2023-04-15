import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-clients-table',
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.scss']
})
export class ClientsTableComponent {
  @Input() dataSource: any;
  @Input() columns: any;
  @Input() displayedColumns: any;
  @Output() editElement = new EventEmitter<any>();
  @Output() deleteElement = new EventEmitter<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openEditForm(client: any) {
    this.editElement.emit(client);
  }

  deleteClient(data: any) {
    this.deleteElement.emit(data);
  }
}
