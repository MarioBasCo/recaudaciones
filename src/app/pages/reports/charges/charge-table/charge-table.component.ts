import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'charge-table',
  templateUrl: './charge-table.component.html',
  styleUrls: ['./charge-table.component.scss']
})
export class ChargeTableComponent {
  @Input() columns: any;
  @Input() displayedColumns: any;
  @Input() dataSource!: MatTableDataSource<any>;
}