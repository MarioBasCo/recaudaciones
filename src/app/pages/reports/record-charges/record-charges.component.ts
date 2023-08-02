import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PdfService } from 'src/app/shared/services/pdf.service';
import { ReportService } from '../report.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-record-charges',
  templateUrl: './record-charges.component.html',
  styleUrls: ['./record-charges.component.scss']
})
export class RecordChargesComponent {
  public startDate!: Date;
  public endDate!: Date;
  public isLoading: boolean = false;
  public showInfo: boolean = false;
  columns = [
    {
      columnDef: 'usuario',
      header: 'Usuario',
      cell: (element: any) => `${element.usuario}`,
      alignment: 'left'
    },
    {
      columnDef: 'inicio',
      header: 'Apertura',
      cell: (element: any) => `${element.inicio}`,
      alignment: 'center'
    },
    {
      columnDef: 'fin',
      header: 'Cierre',
      cell: (element: any) => `${element.fin}`,
      alignment: 'center'
    },
    {
      columnDef: 'recaudado',
      header: 'T. Recaudado',
      cell: (element: any) => `$ ${parseFloat(element.recaudado).toFixed(2)}`,
      alignment: 'right'
    },
    {
      columnDef: 'observacion',
      header: 'Observación',
      cell: (element: any) => `${element.observacion ?? ''}`,
      alignment: 'left'
    },
  ];

  columns2 = [
    {
      columnDef: 'cliente',
      header: 'Cliente',
      cell: (element: any) => `${element.cliente}`,
      alignment: 'left'
    },
    {
      columnDef: 'placa',
      header: 'Placa',
      cell: (element: any) => `${element.placa}`,
      alignment: 'center'
    },
    {
      columnDef: 'valor',
      header: 'Valor',
      cell: (element: any) => `$ ${parseFloat(element.valor).toFixed(2)}`,
      alignment: 'right'
    },
    {
      columnDef: 'fecha',
      header: 'Fecha',
      cell: (element: any) => `${element.fecha}`,
      alignment: 'center'
    },
    {
      columnDef: 'hora',
      header: 'Hora',
      cell: (element: any) => `${element.hora}`,
      alignment: 'center'
    },
    {
      columnDef: 'usuario',
      header: 'Recaudador',
      cell: (element: any) => `${element.usuario}`,
      alignment: 'center'
    },
  ];
  private isDateRangeValid$ = new BehaviorSubject<boolean>(false);
  isDateRangeValidObservable: Observable<boolean> = this.isDateRangeValid$.asObservable();
  dataSource!: MatTableDataSource<any>;
  dataSourceG!: MatTableDataSource<any>;

  constructor(
    private _svcReport: ReportService,
    private _svcPdf: PdfService,
    private datePipe: DatePipe,
    private toast: ToastService) {
  }

  ngOnInit(): void {
    this.isDateRangeValidObservable.subscribe(
      (isValid: boolean) => {
        if (!isValid) {
          this.showInfo = false;
        }
      }
    );
  }

  get isDateRangeValid(): boolean {
    const isValid = this.startDate !== null && this.endDate !== null && this.startDate <= this.endDate;
    this.isDateRangeValid$.next(isValid);
    return isValid;
  }


  search() {
    this.isLoading = true;
    this.buscarInformacion();
  }

  buscarInformacion() {
    const startDateFormatted = this.datePipe.transform(this.startDate, 'yyyy-MM-dd');
    const endDateFormatted = this.datePipe.transform(this.endDate, 'yyyy-MM-dd');
    if (startDateFormatted && endDateFormatted) {
      this._svcReport.getHistoryCobros(startDateFormatted, endDateFormatted).subscribe(resp => {
        this.isLoading = false;
        if (resp) {
          console.log(resp);
          this.showInfo = true;
          this.dataSource = new MatTableDataSource(resp.informacionDetallada);
          this.dataSourceG = new MatTableDataSource(resp.informacionResumida);
        } else {
          this.showInfo = false;
          this.toast.openSnackBar('No se encontraron registros.', 'info');
        }
      });
    }
  }

  printGeneral(){
    this.buildPdf('General de Cobros', this.dataSourceG.data, this.columns);
  }

  printFull() {
    this.buildPdf('de Cobros Detallados', this.dataSource.data, this.columns2);
  }

  buildPdf(titulo: string, datos: any, columnas: any){
    const startDateFormatted = this.datePipe.transform(this.startDate, 'dd-MM-yyyy');
    const endDateFormatted = this.datePipe.transform(this.endDate, 'dd-MM-yyyy');
    const docDefinition = {
      pageMargins: [40, 80, 40, 40],
      header: {
        margin: 20,
        columns: [
          {
            image: `data:image/png;base64,${this._svcPdf.imageBase64}`,
            width: 50
          },
          {
            stack: [
              { text: 'Secretaría Tecnica de Gestión Inmobilibaria del Sector Público', style: 'headerTitle' },
              { text: 'Puerto Persquero Anconcito', style: 'subheader' },
              { text: `Historial ${titulo} del ${startDateFormatted} al ${endDateFormatted}`, style: 'subheader' }
            ]
          }
        ],
      },
      content: [
        {
          table: {
            widths: '*',
            headerRows: 1,
            body: this._svcPdf.generateTable(datos, columnas),
          }
        }
      ],

      styles: {
        headerTitle: {
          fontSize: 14,
          bold: true,
          alignment: 'center',
        },
        subheader: {
          fontSize: 12,
          alignment: 'center',
          margin: [0, 0, 0, 2] // Márgenes de los subtítulos
        },
      }
    };
    this._svcPdf.generatePdf(docDefinition);
  }
}
