import { ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'history-table',
  templateUrl: './history-table.component.html',
  styleUrls: ['./history-table.component.scss']
})
export class HistoryTableComponent {
  @Input() dataSource!: MatTableDataSource<any>;
  @Input() columns!: any[];
  displayedColumns!: string[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private cd: ChangeDetectorRef) {
    this.columns = [];
    this.displayedColumns = [];
  }

  ngAfterViewInit() {
    this.displayedColumns = this.columns.map( d=> d.columnDef);
    this.cd.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
