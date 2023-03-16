import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CloseTurnsComponent } from './close-turns/close-turns.component';
import { TicketTurnsComponent } from './ticket-turns/ticket-turns.component';

const routes: Routes = [
  {
    path: 'turns',
    component: TicketTurnsComponent
  },
  {
    path: 'close-turns',
    component: CloseTurnsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcessesRoutingModule { }
