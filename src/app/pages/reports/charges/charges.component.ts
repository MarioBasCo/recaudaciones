import { DatePipe } from "@angular/common";
import { Component, ViewChild } from "@angular/core";

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
  public startDate!: Date;
  public endDate!: Date;
  public isLoading: boolean = false;
  public showInfo: boolean = false;
  displayedColumns = ['detalle', 'suma_total'];
  dataSource!: MatTableDataSource<any>;
  private isDateRangeValid$ = new BehaviorSubject<boolean>(false);
  isDateRangeValidObservable: Observable<boolean> = this.isDateRangeValid$.asObservable();

  constructor(private datePipe: DatePipe,
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
          this.dataSource = new MatTableDataSource(resp.data);
          this.showInfo = true;
          this.chartOptions = {
            series: resp.data.map((d: any) => Number(d.suma_total)),
            chart: {
              type: "donut",
              toolbar: {
                show: true
              }
            },
            labels: resp.data.map((d: any) => d.detalle),
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
        } else {
          this.showInfo = false;
          this.toast.openSnackBar('No se encontraron registros.', 'info');
        }
      });
    }
  }
}
