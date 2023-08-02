import { DatePipe } from "@angular/common";
import { ChangeDetectorRef, Component, ViewChild } from "@angular/core";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ChartComponent
} from "ng-apexcharts";
import { ReportService } from "../report.service";
import { ToastService } from "src/app/shared/services/toast.service";
import { MatTableDataSource } from "@angular/material/table";
import { BehaviorSubject, Observable } from "rxjs";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-charges',
  templateUrl: './charges.component.html',
  styleUrls: ['./charges.component.scss'],
})
export class ChargesComponent {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions> | any;

  @ViewChild("chartpolar") chartPolar!: ChartComponent;
  public chartPolarOptions!: Partial<ChartOptions> | any;

  public startDate!: Date;
  public endDate!: Date;
  public isLoading: boolean = false;
  public showInfo: boolean = false;
  displayedColumns = ['detalle', 'suma_total'];
  columns: any[] = [];
  columnsU: any[] = [];
  dataSource!: MatTableDataSource<any>;
  displayedColumnsU = ['usuario', 'suma_total'];
  dataSourceU!: MatTableDataSource<any>;
  private isDateRangeValid$ = new BehaviorSubject<boolean>(false);
  isDateRangeValidObservable: Observable<boolean> = this.isDateRangeValid$.asObservable();

  constructor(
    private cd: ChangeDetectorRef,
    private datePipe: DatePipe,
    private _svcReport: ReportService,
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
    const startDateFormatted = this.datePipe.transform(this.startDate, 'yyyy-MM-dd');
    const endDateFormatted = this.datePipe.transform(this.endDate, 'yyyy-MM-dd');
    if (startDateFormatted && endDateFormatted) {
      this._svcReport.tiposPorFechas(startDateFormatted, endDateFormatted).subscribe(resp => {
        this.isLoading = false;
        if (resp.status) {
          let info1 = resp.data.sumaTotalPorTipo;
          this.dataSource = new MatTableDataSource(info1);
          this.chartOptions = this.renderDonut(info1);
          this.columns = [
            {
              columnDef: 'detalle',
              header: 'Tipo Vehículo.',
              cell: (element: any) => `${element.detalle}`,
            },
            {
              columnDef: 'suma_total',
              header: 'Monto',
              cell: (element: any) => ` $ ${element.suma_total}`,
            }
          ];
          this.cd.detectChanges();

          let info2 = resp.data.sumaTotalPorUsuario;
          this.dataSourceU = new MatTableDataSource(info2);
          this.chartPolarOptions = this.renderPolarArea(info2);
          this.columnsU = [
            {
              columnDef: 'usuario',
              header: 'Usuario',
              cell: (element: any) => `${element.usuario}`,
            },
            {
              columnDef: 'suma_total',
              header: 'Monto',
              cell: (element: any) => ` $ ${element.suma_total}`,
            }
          ];
          this.cd.detectChanges();
          this.showInfo = true;
        } else {
          this.showInfo = false;
          this.toast.openSnackBar('No se encontraron registros.', 'info');
        }
      });
    }
  }


  renderDonut(info: any) {
    return {
      series: info.map((d: any) => Number(d.suma_total)),
      chart: {
        type: "donut",
        toolbar: {
          show: true
        }
      },
      labels: info.map((d: any) => d.detalle),
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  renderPolarArea(info: any) {
    return {
      series: info.map((d: any) => d.suma_total),
      labels: info.map((d: any) => d.usuario),
      chart: {
        type: "polarArea",
        toolbar: {
          show: true
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }
}
