import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { distinctUntilChanged } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { EChartsOption } from 'echarts';
import { DashboardService } from './dashboard.service';

export interface IGrid {
  columns: number,
  miniCard: IGridChild,
  chart: IGridChild,
  table: IGridChild,
}

export interface IGridChild {
  col: number,
  row: number
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  recaudacionMensual: number = 0;
  recaudacionPorTipoVehiculo: any[]=[];

  readonly breakpoint$ = this.breakpointObserver
  .observe( [
    Breakpoints.XSmall,
    Breakpoints.Small,
    Breakpoints.Medium,
    Breakpoints.Large,
    Breakpoints.XLarge,
  ])
  .pipe(
    distinctUntilChanged()
  );

  cols: any;
  colsChart: any;

  miniCards: any[] = []

  option!: EChartsOption;
  chartOption!: EChartsOption;

  constructor(
    private breakpointObserver: BreakpointObserver, 
    private cd: ChangeDetectorRef,
    private _svcDashboard: DashboardService) { 
  }

  private breakpointChanged() {
    if (this.breakpointObserver.isMatched(Breakpoints.XSmall)) {
      this.cols = 1;
      this.colsChart = 1;
    } 
    if (this.breakpointObserver.isMatched(Breakpoints.Small)) {
      this.cols = 2;
      this.colsChart = 1;
    } 
    if (this.breakpointObserver.isMatched(Breakpoints.Medium)) {
      this.cols = 3;
      this.colsChart = 2;
    } 
    if (this.breakpointObserver.isMatched(Breakpoints.Large)) {
      this.cols = 4;
      this.colsChart = 2;
    }
    if (this.breakpointObserver.isMatched(Breakpoints.XLarge)) {
      this.cols = 4;
      this.colsChart = 2;
    }
  };

  ngOnInit(): void {
    this.breakpoint$.subscribe(() =>
      this.breakpointChanged()
    );
    this._svcDashboard.getInfo().subscribe((resp: any) => {
      this.cd.detectChanges();
      this.recaudacionMensual = resp.recaudacionMensual;
      this.chartOption = {
        series: [
          {
            type: 'gauge',
            axisLine: {
              lineStyle: {
                width: 10,
                color: [
                  [0.3, '#67e0e3'],
                  [0.7, '#37a2da'],
                  [1, '#fd666d']
                ]
              }
            },
            pointer: {
              itemStyle: {
                color: 'auto'
              }
            },
            axisTick: {
              distance: -30,
              length: 4,
              lineStyle: {
                color: '#fff',
                width: 2
              }
            },
            splitLine: {
              distance: -30,
              length: 30,
              lineStyle: {
                color: '#fff',
                width: 4
              }
            },
            axisLabel: {
              color: 'inherit',
              distance: 25,
              fontSize: 12
            },
            detail: {
              valueAnimation: true,
              formatter: '$ {value}',
              color: 'inherit',
              fontSize: 20
            },
            data: [
              {
                value: this.recaudacionMensual
              }
            ]
          }
        ]
      };

      this.miniCards = [
        {
          textValue: 'Clientes',
          value: resp.clientesActivos,
          icon: 'people',
          color: '#6737B8'
        },
        {
          textValue: 'Usuarios',
          value: resp.usuarios,
          icon: 'business_center',
          color: '#FFD635'
        },
        {
          textValue: 'Locales Alquilados',
          value: resp.locales,
          icon: 'local_convenience_store',
          color: '#F44133'
        },
        {
          textValue: 'Recaudación Diaria',
          value: resp.recaudacionDiaria,
          icon: 'attach_money',
          color: '#6737B8'
        }
      ];
      const recaudacionTransformada = resp.recaudacionPorTipoVehiculo.map((vehiculo: any) => {
        return {
          name: vehiculo.nombre,
          value: parseFloat(vehiculo.suma)
        };
      });

      
      this.option  = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'Tipo Vehículo',
            type: 'pie',
            radius: '50%',
            data: recaudacionTransformada,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
    });
  }
}
