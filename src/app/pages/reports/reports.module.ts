import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { RecordChargesComponent } from './record-charges/record-charges.component';
import { ChargesComponent } from './charges/charges.component';
import { RangeDateComponent } from 'src/app/components/range-date/range-date.component';
import { SubheaderComponent } from 'src/app/components/subheader/subheader.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { NgApexchartsModule } from "ng-apexcharts";
import { ChargeTableComponent } from './charges/charge-table/charge-table.component';
import { BackgroundComponent } from 'src/app/components/background/background.component';
import { ShopChargesComponent } from './shop-charges/shop-charges.component';
import { FullDetailComponent } from './record-charges/full-detail/full-detail.component';
import { SortDetailComponent } from './record-charges/sort-detail/sort-detail.component';
import { HistoryTableComponent } from './record-charges/history-table/history-table.component';
import { PaymentsTableComponent } from './shop-charges/payments-table/payments-table.component';

@NgModule({
  declarations: [
    RecordChargesComponent,
    ChargesComponent,
    ChargeTableComponent,
    ShopChargesComponent,
    FullDetailComponent,
    SortDetailComponent,
    HistoryTableComponent,
    PaymentsTableComponent
  ],
  imports: [
    CommonModule,
    SubheaderComponent,
    RangeDateComponent,
    ReportsRoutingModule,
    MaterialModule,
    NgApexchartsModule,
    BackgroundComponent
  ],
  providers: [DatePipe]
})
export class ReportsModule { }
