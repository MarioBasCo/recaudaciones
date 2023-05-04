import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'charge-table',
  templateUrl: './charge-table.component.html',
  styleUrls: ['./charge-table.component.scss']
})
export class ChargeTableComponent {
  displayedColumns = ['user', 'position', 'monto'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
}

export interface Element {
  id?: number;
  user: string;
  position: number;
  monto: number;
}

const ELEMENT_DATA: Element[] = [
  { position: 1, user: 'Hydrogen', monto: 1.0079 },
  { position: 2, user: 'Helium', monto: 4.0026 },
  { position: 3, user: 'Lithium', monto: 6.941 },
  { position: 4, user: 'Beryllium', monto: 9.0122 },
  { position: 5, user: 'Boron', monto: 10.811 },
  { position: 6, user: 'Carbon', monto: 12.0107 },
  { position: 7, user: 'Nitrogen', monto: 14.0067 },
  { position: 8, user: 'Oxygen', monto: 15.9994 },
  { position: 9, user: 'Fluorine', monto: 18.9984 },
  { position: 10, user: 'Neon', monto: 20.1797 },
  { position: 11, user: 'Sodium', monto: 22.9897 },
  { position: 12, user: 'Magnesium', monto: 24.305 },
  { position: 13, user: 'Aluminum', monto: 26.9815 },
  { position: 14, user: 'Silicon', monto: 28.0855 },
  { position: 15, user: 'Phosphorus', monto: 30.9738 },
  { position: 16, user: 'Sulfur', monto: 32.065 },
  { position: 17, user: 'Chlorine', monto: 35.453 },
  { position: 18, user: 'Argon', monto: 39.948 },
  { position: 19, user: 'Potassium', monto: 39.0983 },
  { position: 20, user: 'Calcium', monto: 40.078 },
];