import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'charge-table',
  templateUrl: './charge-table.component.html',
  styleUrls: ['./charge-table.component.scss']
})
export class ChargeTableComponent {
  @Input() displayedColumns: any;
  @Input() dataSource!: MatTableDataSource<any>;
}