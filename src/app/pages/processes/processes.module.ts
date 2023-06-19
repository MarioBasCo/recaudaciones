import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ProcessesRoutingModule } from './processes-routing.module';
import { CloseTurnsComponent } from './close-turns/close-turns.component';
import { TicketTurnsComponent } from './ticket-turns/ticket-turns.component';
import { SubheaderComponent } from 'src/app/components/subheader/subheader.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlaqueDirective } from 'src/app/shared/directives/plaque.directive';
import { BackgroundComponent } from 'src/app/components/background/background.component';
import { NgxPrintModule } from 'ngx-print';
import { ObservationComponent } from './close-turns/observation/observation.component' ;

@NgModule({
  declarations: [
    CloseTurnsComponent,
    TicketTurnsComponent,
    ObservationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PlaqueDirective,
    MaterialModule,
    SubheaderComponent,
    BackgroundComponent,
    NgxPrintModule,
    ProcessesRoutingModule
  ],
  providers: [DatePipe]
})
export class ProcessesModule { }
