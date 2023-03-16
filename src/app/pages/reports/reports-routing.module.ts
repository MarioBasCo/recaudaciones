import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChargesComponent } from './charges/charges.component';
import { RecordChargesComponent } from './record-charges/record-charges.component';

const routes: Routes = [
  {
    path: 'charges',
    component: ChargesComponent
  },
  {
    path: 'record-charges',
    component: RecordChargesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
