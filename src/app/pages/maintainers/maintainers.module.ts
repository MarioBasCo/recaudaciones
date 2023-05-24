import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaintainersRoutingModule } from './maintainers-routing.module';
import { ClientsComponent } from './clients/clients.component';
import { ContractsComponent } from './contracts/contracts.component';
import { ParamsComponent } from './params/params.component';
import { RolesComponent } from './roles/roles.component';
import { UsersComponent } from './users/users.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
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
import { TrimDirective } from 'src/app/shared/directives/trim.directive';
import { DisallowSpacesDirective } from 'src/app/shared/directives/disallow-spaces.directive';
import { OnlyNumbersDirective } from 'src/app/shared/directives/only-numbers.directive';
import { PlaqueDirective } from 'src/app/shared/directives/plaque.directive';
import { PhoneDirective } from 'src/app/shared/directives/phone.directive';
import { RoleFormComponent } from './roles/role-form/role-form.component';
import { RolesTableComponent } from './roles/roles-table/roles-table.component';

@NgModule({
  declarations: [
    ClientsComponent,
    ContractsComponent,
    ParamsComponent,
    RolesComponent,
    UsersComponent,
    UserFormComponent,
    ClientsTableComponent,
    ClientFormComponent,
    UsersTableComponent,
    FormContractComponent,
    RoleFormComponent,
    RolesTableComponent
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
    NgxMaskPipe,
    TrimDirective,
    DisallowSpacesDirective,
    OnlyNumbersDirective,
    PhoneDirective,
    PlaqueDirective
  ],
  providers: [
    provideNgxMask()
  ],
})
export class MaintainersModule { }
