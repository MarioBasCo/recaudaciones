import { Component, Input } from '@angular/core';

@Component({
  selector: 'payments-table',
  templateUrl: './payments-table.component.html',
  styleUrls: ['./payments-table.component.scss']
})
export class PaymentsTableComponent {
  @Input() pagosData!: any[];
  columnas: string[] = [
    'mes',
    'arrendatario',
    'local',
    'valorArriendo',
    'totalAbonos',
    'detallePagos'
  ];
}
