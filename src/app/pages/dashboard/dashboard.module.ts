import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { CardComponent } from 'src/app/components/card/card.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [
  {
    path: '',
    component: DashboardComponent
  },
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    MaterialModule,
    CardComponent,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    RouterModule.forChild(routes)
  ]
})
export class DashboardModule { }
