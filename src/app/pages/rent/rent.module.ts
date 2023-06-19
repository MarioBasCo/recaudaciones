import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RentRoutingModule } from './rent-routing.module';
import { RentComponent } from './rent.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ManagementComponent } from './management/management.component';
import { ChargesRentComponent } from './charges-rent/charges-rent.component';
import { RentalFormComponent } from './rental-form/rental-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RentComponent,
    ManagementComponent,
    ChargesRentComponent,
    RentalFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RentRoutingModule,
    MaterialModule
  ]
})
export class RentModule { }
