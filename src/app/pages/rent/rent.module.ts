import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RentRoutingModule } from './rent-routing.module';
import { RentComponent } from './rent.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ManagementComponent } from './management/management.component';
import { ChargesRentComponent } from './charges-rent/charges-rent.component';

@NgModule({
  declarations: [
    RentComponent,
    ManagementComponent,
    ChargesRentComponent
  ],
  imports: [
    CommonModule,
    RentRoutingModule,
    MaterialModule
  ]
})
export class RentModule { }
