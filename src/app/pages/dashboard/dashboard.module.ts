import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { CardComponent } from 'src/app/components/card/card.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { Route, RouterModule } from '@angular/router';
import { MiniCardComponent } from 'src/app/components/mini-card/mini-card.component';

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
    MiniCardComponent,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    RouterModule.forChild(routes)
  ]
})
export class DashboardModule { }
