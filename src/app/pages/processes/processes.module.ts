import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ProcessesRoutingModule } from './processes-routing.module';
import { CloseTurnsComponent } from './close-turns/close-turns.component';
import { TicketTurnsComponent } from './ticket-turns/ticket-turns.component';
import { SubheaderComponent } from 'src/app/components/subheader/subheader.component';


@NgModule({
  declarations: [
    CloseTurnsComponent,
    TicketTurnsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SubheaderComponent,
    ProcessesRoutingModule
  ]
})
export class ProcessesModule { }
