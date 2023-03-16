import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaintainersRoutingModule } from './maintainers-routing.module';
import { ClientsComponent } from './clients/clients.component';
import { ContractsComponent } from './contracts/contracts.component';
import { ParamsComponent } from './params/params.component';
import { RolesComponent } from './roles/roles.component';
import { UsersComponent } from './users/users.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    ClientsComponent,
    ContractsComponent,
    ParamsComponent,
    RolesComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MaintainersRoutingModule
  ]
})
export class MaintainersModule { }
