import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaintainersRoutingModule } from './maintainers-routing.module';
import { ClientsComponent } from './clients/clients.component';
import { ContractsComponent } from './contracts/contracts.component';
import { ParamsComponent } from './params/params.component';
import { RolesComponent } from './roles/roles.component';
import { UsersComponent } from './users/users.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ModalAddRoleComponent } from './roles/modal-add-role/modal-add-role.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ClientsComponent,
    ContractsComponent,
    ParamsComponent,
    RolesComponent,
    UsersComponent,
    ModalAddRoleComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    MaintainersRoutingModule
  ]
})
export class MaintainersModule { }
