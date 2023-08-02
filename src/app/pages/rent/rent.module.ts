import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RentRoutingModule } from './rent-routing.module';
import { RentComponent } from './rent.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ManagementComponent } from './management/management.component';
import { ChargesRentComponent } from './charges-rent/charges-rent.component';
import { RentalFormComponent } from './rental-form/rental-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { OnlyNumbersDirective } from 'src/app/shared/directives/only-numbers.directive';

@NgModule({
  declarations: [
    RentComponent,
    ManagementComponent,
    ChargesRentComponent,
    RentalFormComponent,
    PaymentFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RentRoutingModule,
    OnlyNumbersDirective,
    MaterialModule
  ]
})
export class RentModule { }
