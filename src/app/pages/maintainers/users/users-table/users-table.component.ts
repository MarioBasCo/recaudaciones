import { Component, Input, ViewChild, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent {
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

  deleteUser(data: any) {
    this.deleteElement.emit(data);
  }
}
