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
import { UserFormComponent } from './users/user-form/user-form.component';
import { ClientsTableComponent } from './clients/clients-table/clients-table.component';
import { ClientFormComponent } from './clients/client-form/client-form.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { SubheaderComponent } from 'src/app/components/subheader/subheader.component';
import { SearchComponent } from 'src/app/components/search/search.component';
import { UsersTableComponent } from './users/users-table/users-table.component';
import { FormContractComponent } from './contracts/form-contract/form-contract.component';
import { NgxDropzoneModule } from 'ngx-dropzone';

@NgModule({
  declarations: [
    ClientsComponent,
    ContractsComponent,
    ParamsComponent,
    RolesComponent,
    UsersComponent,
    ModalAddRoleComponent,
    UserFormComponent,
    ClientsTableComponent,
    ClientFormComponent,
    UsersTableComponent,
    FormContractComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgxDropzoneModule,
    SubheaderComponent,
    SearchComponent,
    ReactiveFormsModule,
    MaintainersRoutingModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  providers: [
    provideNgxMask()
  ],
})
export class MaintainersModule { }
