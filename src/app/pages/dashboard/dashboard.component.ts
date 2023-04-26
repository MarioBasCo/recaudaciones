import { Component, OnInit } from '@angular/core';
import { distinctUntilChanged } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { EChartsOption } from 'echarts';

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

  miniCards: any[] = [
    {
      textValue: 'Clientes',
      value: 45,
      icon: 'people',
      color: '#6737B8'
    },
    {
      textValue: 'Usuarios',
      value: 4,
      icon: 'business_center',
      color: '#FFD635'
    },
    {
      textValue: 'Locales Pendientes de cobro',
      value: 3,
      icon: 'local_convenience_store',
      color: '#F44133'
    },
    {
      textValue: 'Recaudación Mensual',
      value: 40,
      icon: 'attach_money',
      color: '#6737B8'
    }
  ]

  option: EChartsOption = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ],
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


  chartOption: EChartsOption = {
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 240,
        splitNumber: 12,
        itemStyle: {
          color: '#58D9F9',
          shadowColor: 'rgba(0,138,255,0.45)',
          shadowBlur: 10,
          shadowOffsetX: 2,
          shadowOffsetY: 2
        },
        progress: {
          show: true,
          roundCap: true,
          width: 5
        },
        pointer: {
          icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
          length: '75%',
          width: 16,
          offsetCenter: [0, '5%']
        },
        axisLine: {
          roundCap: true,
          lineStyle: {
            width: 18
          }
        },
        axisTick: {
          splitNumber: 2,
          lineStyle: {
            width: 2,
            color: '#999'
          }
        },
        splitLine: {
          length: 12,
          lineStyle: {
            width: 3,
            color: '#999'
          }
        },
        axisLabel: {
          distance: 30,
          color: '#999',
          fontSize: 10
        },
        title: {
          show: false
        },
        detail: {
          backgroundColor: '#fff',
          borderColor: '#999',
          borderWidth: 2,
          width: '60%',
          lineHeight: 40,
          height: 40,
          borderRadius: 8,
          offsetCenter: [0, '35%'],
          valueAnimation: true,
          formatter: function (value: any) {
            return '{value|' + value.toFixed(0) + '}{unit|km/h}';
          },
          rich: {
            value: {
              fontSize: 20,
              fontWeight: 'bolder',
              color: '#777'
            },
            unit: {
              fontSize: 14,
              color: '#999',
              padding: [0, 0, -20, 10]
            }
          }
        },
        data: [
          {
            value: 100
          }
        ]
      }
    ]
  };

  constructor(private breakpointObserver: BreakpointObserver) { 
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
  }
}
